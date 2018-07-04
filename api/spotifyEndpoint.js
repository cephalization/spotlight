const {
  getAppAuthorization,
  spotifyGeneralRequest
} = require('./spotifyRequester');

/**
 * Endpoint configuration for Spotify API
 *
 * We wrap the endpoint here so that we can determine which access tokens
 * to use. User Tokens vs the general token.
 *
 * Whenever a client requests from this API, they should save the generalAuth
 * property of the response in their cookies, and use that in every subsequent
 * response. This will prevent hardship on the Spotify API.
 *
 * {
 *  "generalAuth": {
 *	  "access_token": "",
 *	  "token_type": "Bearer",
 *	  "expires_in": 3600,
 *	  "scope": "",
 *	  "expires_on": "2018-03-11T15:36:14.289Z"
 *	}
 * }
 *
 * https://beta.developer.spotify.com/documentation/web-api/reference/
 */

const ENDPOINT_URI = '/spotify';

module.exports.RegisterRoutes = (router) => {
  /**
   * /api/spotify/artist-search endpoint
   *
   * Wrapper for GET https://api.spotify.com/v1/search
   *
   * Expects JSON body of:
   * {
   *  data: {
   *    generalAuth, // auth information, described at top of file
   *    artistQuery, // string containing user's query for an artist
   *  }
   * }
   *
   * Returns JSON body of:
   * {
   *  data: {
   *    success, // boolean containing status of operation
   *    error, // If any
   *    generalAuth, // auth information, described at top of file
   *    artist, // object containing spotify's response for the FIRST artist found
   *  }
   * }
   *
   * @methods: POST (should be get and read from headers+querystring)
   */
  router.post(ENDPOINT_URI + '/artist-search/', async (req, res) => {
    getAppAuthorization(req, (e, authorization) => {
      if (!e && req.body.data != null) {
        const message = ENDPOINT_URI + ': API GET Request Received with auth.';

        // We have authorization from Spotify, query for the artist
        spotifyGeneralRequest(
          'https://api.spotify.com/v1/search',
          `q=${encodeURIComponent(req.body.data.artistQuery)}&type=artist`,
          'get',
          authorization,
          (e, searchResponse, body) => {
            if (!e && searchResponse.statusCode === 200) {
              // Return the first artist we find, change this later
              res.json({
                success: true,
                data: {
                  generalAuth: authorization,
                  artist: body.artists.items[0]
                }
              });
            } else {
              res.status(body.error.status).json({ success: false, message: body.error.message, error: body.error });
            }
          }
        );
      } else {
        const message = ENDPOINT_URI + ': API GET Request FAILED. See Response.';
        res.status(message.statusCode).json({ success: false, message, error: e });
      }
    })
  });

  /**
   * /api/spotify/artist endpoint
   *
   * Wrapper for GET https://api.spotify.com/v1/search
   *
   * Expects JSON body of:
   * {
   *  data: {
   *    generalAuth, // auth information, described at top of file
   *    artistQuery, // string containing user's query for an artist
   *  }
   * }
   *
   * Returns JSON body of:
   * {
   *  data: {
   *    success, // boolean containing status of operation
   *    error, // If any
   *    generalAuth, // auth information, described at top of file
   *    artist, // object containing spotify's response for the FIRST artist found
   *  }
   * }
   *
   * @methods: POST (should be get and read from headers+querystring)
   */
  router.post(ENDPOINT_URI + '/artist/', async (req, res) => {
    getAppAuthorization(req, (e, authorization) => {
      if (!e && req.body.data != null) {
        const message = ENDPOINT_URI + ': API GET Request Received with auth.';

        // We have authorization from Spotify, query for the artist
        spotifyGeneralRequest(
          `https://api.spotify.com/v1/artists/${req.body.data.artistID}`,
          null,
          'get',
          authorization,
          (e, searchResponse, body) => {
            if (!e && searchResponse.statusCode === 200) {
              // Return the first artist we find, change this later
              res.json({
                success: true,
                data: {
                  generalAuth: authorization,
                  artist: body
                }
              });
            } else {
              res.status(body.error.status).json({ success: false, message: body.error.message, error: body.error });
            }
          }
        );
      } else {
        const message = ENDPOINT_URI + ': API GET Request FAILED. See Response.';
        res.json({ success: false, message, error: e });
      }
    });
  });

  /**
   * /api/spotify/relatedartists endpoint
   *
   * Wrapper for GET https://api.spotify.com/v1/search
   *
   * Expects JSON body of:
   * {
   *  data: {
   *    generalAuth, // auth information, described at top of file
   *    artistQuery, // string containing user's query for an artist
   *  }
   * }
   *
   * Returns JSON body of:
   * {
   *  data: {
   *    success, // boolean containing status of operation
   *    error, // If any
   *    generalAuth, // auth information, described at top of file
   *    artist, // object containing spotify's response for the FIRST artist found
   *  }
   * }
   *
   * @methods: POST (should be get and read from headers+querystring)
   */
  router.post(ENDPOINT_URI + '/relatedartists/', async (req, res) => {
    getAppAuthorization(req, (e, authorization) => {
      if (!e && req.body.data != null) {
        const message = ENDPOINT_URI + ': API GET Request Received with auth.';

        // We have authorization from Spotify, query for the artist
        spotifyGeneralRequest(
          `https://api.spotify.com/v1/artists/${req.body.data.artistID}/related-artists`,
          null,
          'get',
          authorization,
          (e, searchResponse, body) => {
            if (!e && searchResponse.statusCode === 200) {
              // Return the first artist we find, change this later
              res.json({
                success: true,
                data: {
                  generalAuth: authorization,
                  artists: body.artists
                }
              });
            } else {
              res.status(body.error.status).json({ success: false, message: body.error.message, error: body.error });
            }
          }
        );
      } else {
        const message = ENDPOINT_URI + ': API GET Request FAILED. See Response.';
        res.json({ success: false, message, error: e });
      }
    });
  });

  /**
   * /api/spotify/toptracks endpoint
   *
   * Wrapper for GET https://api.spotify.com/v1/artists/{id}/top-tracks
   *
   * Expects JSON body of:
   * {
   *  data: {
   *    generalAuth, // auth information, described at top of file
   *    artistQuery, // string containing user's query for an artist
   *  }
   * }
   *
   * Returns JSON body of:
   * {
   *  data: {
   *    success, // boolean containing status of operation
   *    error, // If any
   *    generalAuth, // auth information, described at top of file
   *    tracks, // array containing spotify's response for the tracks of an artist
   *  }
   * }
   *
   * @methods: POST (should be get and read from headers+querystring)
   */
  router.post(ENDPOINT_URI + '/toptracks/', async (req, res) => {
    getAppAuthorization(req, (e, authorization) => {
      if (!e && req.body.data != null) {
        const message = ENDPOINT_URI + ': API GET Request Received with auth.';

        // We have authorization from Spotify, query for the artist
        spotifyGeneralRequest(
          `https://api.spotify.com/v1/artists/${req.body.data.artistID}/top-tracks?country=US`,
          null,
          'get',
          authorization,
          (e, topTracksResponse, body) => {
            if (!e && topTracksResponse.statusCode === 200) {
              // Return the first artist we find, change this later
              res.json({
                success: true,
                data: {
                  generalAuth: authorization,
                  tracks: body.tracks
                }
              });
            } else {
              res.status(body.error.status).json({ success: false, message: body.error.message, error: body.error });
            }
          }
        );
      } else {
        const message = ENDPOINT_URI + ': API GET Request FAILED. See Response.';
        res.json({ success: false, message, error: e });
      }
    });
  });
}
