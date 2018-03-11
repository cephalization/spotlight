const { getAppAuthorization } = require('./spotifyAuthenticator');

/**
 * Endpoint configuration for Spotify API
 *
 * We wrap the endpoint here so that we can determine which access tokens
 * to use. User Tokens vs the general token.
 *
 * https://beta.developer.spotify.com/documentation/web-api/reference/
 */

const ENDPOINT_URI = '/spotify';

module.exports.RegisterRoutes = (router) => {
  /**
   * /api/spotify/artist endpoint
   *
   * Wrapper for GET https://api.spotify.com/v1/search
   *
   * @methods: GET
   */
  router.get(ENDPOINT_URI + '/artist/', async (req, res) => {
    getAppAuthorization(req, (e, authorization) => {
      if (!e) {
        const message = ENDPOINT_URI + ': API GET Request Received with auth.';
        console.log(message);
        res.json({ success: true, message, data: { generalAuth: authorization } });
      } else {
        const message = ENDPOINT_URI + ': API GET Request FAILED. See Response.';
        console.log(message);
        res.json({ success: false, message, error: e });
      }
    })
  })
}