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
 *
 * @param {Object} req the original request object to the Spotlight api
 * @param {Function} callback non-standard callback function, receives (error, generalAuth)
 */
function requestAuthorization(req, callback) {
  let reAuth = true;
  if (
    req.body.data &&
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

/**
 * Create a header using an access token for spotify api requests
 *
 * @param {Object} authentication generalAuth object described at top of this file
 */
function createAccessHeader(authentication) {
  return `${authentication.token_type} ${authentication.access_token}`
}

/**
 * Make a request to the spotify api
 *
 * @param {String} URL spotify endpoint to query
 * @param {String} QUERY uri encoded querystring as described by spotify api docs
 * @param {String} REQUEST_TYPE string denoting which http request method to use
 * @param {Object} AUTHENTICATION generalAuth object described at top of this file
 * @param {Function} callback function to invoke after making the request
 */
function spotifyGeneralRequest(URL, QUERY, REQUEST_TYPE, AUTHENTICATION, callback) {
  const requestConfig = {
    url: `${URL}${QUERY != null ? '?' + QUERY : ''}`,
    headers: { Authorization: createAccessHeader(AUTHENTICATION) },
    json: true
  };
  request[REQUEST_TYPE](
    requestConfig,
    (e, response, body) => {
      callback(e, response, body);
    }
  )
}

module.exports.getAppAuthorization = requestAuthorization;
module.exports.spotifyGeneralRequest = spotifyGeneralRequest;