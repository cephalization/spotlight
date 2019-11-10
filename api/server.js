const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("config");

const spotifyEndpoint = require("./spotifyEndpoint");

const api = express();

/**
 * Setup server config constants
 */
const port = config.get("API_PORT");

const baseURL = config.get("API_BASE_URL");

/**
 * Apply Express Middlewares
 */
api.use(bodyParser.json());
api.use(cookieParser());
api.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/**
 * Create API Routes
 */
const router = express.Router();
spotifyEndpoint.RegisterRoutes(router);

/**
 * Register API Routes
 */
api.use(baseURL, router);

if (process.env.NODE_ENV === "production") {
  /**
   * Start the server with NOW
   */
  module.exports = api;
} else {
  /**
   * Start the server locally
   */
  api.listen(port);
  console.log("Spotlight API is listening on port:" + port);
}
