require('request');
const fs = require('fs');
const moment = require('moment');
const request = require('request');

// Generate authorization request information for a GENERAL token
const {
  spotify_client_id,
  spotify_client_secret,
  spotify_redirect_uri,
} = require('./apiAuthentication');
const authHeader =
  'Basic ' + (new Buffer(spotify_client_id + ':' + spotify_client_secret).toString('base64'));
const authRequestOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': authHeader
  },
  form: {
    grant_type: 'client_credentials',
  },
  json: true,
};

/**
 * Retrieve a new Authorization Token from Spotify
 *
 * Will invoke provided callback with the following
 * callback(
 *  error message || null,
 *  {
 *   access_token,
 *   token_type,
 *   expires_in,  // Usually one hour
 *   expires_on,  // moment() + expires_in
 *  }
 * )
 */
function requestAuthorization(req, callback) {
  let reAuth = true;
  if (
    req.body.data.generalAuth &&
    req.body.data.generalAuth.access_token &&
    req.body.data.generalAuth.expires_on
  ) {
    // If the token exists and is not expired, do not reauth
    if (!moment().isAfter(req.body.data.generalAuth.expires_on)) {
      reAuth = false;
    }
  }

  if (reAuth) {
    request.post(
      authRequestOptions,
      (e, res, body) => {
        if (!e && res.statusCode === 200) {
          const expiration_date = moment();
          expiration_date.add(body.expires_in, 'seconds');
          // Return new auth bundle to requesting endpoint
          callback(null, {
            ...body,
            expires_on: expiration_date
          });
        } else {
          // Could not auth with Spotify, return error
          callback(body.error);
        }
      }
    );
  } else {
    // Requester's auth is good, use that
    callback(null, req.body.data.generalAuth);
  }
}

module.exports.getAppAuthorization = requestAuthorization;