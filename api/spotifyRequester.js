const moment = require("moment");
const request = require("request");
const querystring = require("querystring");
const some = require("lodash/some");

const config = require("../config");

const BASE_URI = config.get("BASE_URI");

// Generate authorization request information for a GENERAL token
const spotify_client_id = config.get("SPOTIFY_CLIENT_ID");
const spotify_client_secret = config.get("SPOTIFY_CLIENT_SECRET");
const spotify_redirect_uri = config.get("SPOTIFY_REDIRECT_URI");

if (
  some(
    [spotify_redirect_uri, spotify_client_id, spotify_client_secret],
    s => s === "" || s == null
  )
) {
  console.error("Configure environment variables in /config. Exiting.");
  process.exit(1);
}

const authHeader = `Basic ${new Buffer(
  `${spotify_client_id}:${spotify_client_secret}`
).toString("base64")}`;
const authRequestOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization: authHeader
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
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
    request.post(authRequestOptions, (e, res, body) => {
      if (!e && res.statusCode === 200) {
        const expiration_date = moment();
        expiration_date.add(body.expires_in, "seconds");
        // Return new auth bundle to requesting endpoint
        callback(null, {
          ...body,
          expires_on: expiration_date
        });
      } else {
        // Could not auth with Spotify, return error
        callback(body.error);
      }
    });
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
  return `${authentication.token_type} ${authentication.access_token}`;
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
function spotifyGeneralRequest(
  URL,
  QUERY,
  REQUEST_TYPE,
  AUTHENTICATION,
  callback
) {
  const requestConfig = {
    url: `${URL}${QUERY != null ? `?${QUERY}` : ""}`,
    headers: { Authorization: createAccessHeader(AUTHENTICATION) },
    json: true
  };
  request[REQUEST_TYPE](requestConfig, (e, response, body) => {
    callback(e, response, body);
  });
}

function spotifyAuthRequest(URL, AUTH_HEADER, QUERY, REQUEST_TYPE, callback) {
  const requestConfig = {
    url: `${URL}${QUERY != null ? `?${QUERY}` : ""}`,
    headers: { Authorization: AUTH_HEADER },
    json: true
  };
  request[REQUEST_TYPE](requestConfig, (e, response, body) => {
    callback(e, response, body);
  });
}

const spotifyStateKey = "spotify_auth_state";

function spotifyLoginRequest() {
  /**
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
  const generateStateID = function(length) {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  return (req, res) => {
    const state = generateStateID(16);
    res.cookie(spotifyStateKey, state);

    const loginScopes = "user-read-private user-read-email user-top-read";
    const authorizationURI = "https://accounts.spotify.com/authorize";
    const authorizationParams = querystring.stringify({
      response_type: "code",
      client_id: spotify_client_id,
      scope: loginScopes,
      redirect_uri: spotify_redirect_uri,
      state
    });

    res.redirect(`${authorizationURI}?${authorizationParams}`);
  };
}

function spotifyLoginCallback() {
  return (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    const storedState = req.cookies ? req.cookies[spotifyStateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect(`${BASE_URI}/error_state_mismatch`);
    } else {
      res.clearCookie(spotifyStateKey);

      const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code,
          redirect_uri: spotify_redirect_uri,
          grant_type: "authorization_code"
        },
        headers: {
          Authorization: `Basic ${new Buffer(
            `${spotify_client_id}:${spotify_client_secret}`
          ).toString("base64")}`
        },
        json: true
      };

      // Request tokens, return them to client
      request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token;
          const refresh_token = body.refresh_token;

          res.redirect(
            `${BASE_URI}/success?${querystring.stringify({
              access_token,
              refresh_token
            })}`
          );
        } else {
          res.redirect(`${BASE_URI}/error`);
        }
      });
    }
  };
}

module.exports.getAppAuthorization = requestAuthorization;
module.exports.spotifyGeneralRequest = spotifyGeneralRequest;
module.exports.spotifyAuthRequest = spotifyAuthRequest;
module.exports.spotifyLoginRequest = spotifyLoginRequest;
module.exports.spotifyLoginCallback = spotifyLoginCallback;
