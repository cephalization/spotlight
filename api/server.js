const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const spotifyEndpoint = require('./spotifyEndpoint');

const api = express();

/**
 * Setup server config constants
 */
const port = process.env.API_PORT == null
  ? 8081
  : process.env.API_PORT;

const baseURL = process.env.API_BASE_URL == null
  ? '/api'
  : process.env.API_BASE_URL;

/**
 * Apply Express Middlewares
 */
api.use(bodyParser.json());
api.use(cookieParser());
api.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * Create API Routes
 */
const router = express.Router();
spotifyEndpoint.RegisterRoutes(router);

/**
 * Register API Routes
 */
api.use(baseURL, router);

/**
 * Start the server
 */
api.listen(port);
console.log('Spotlight API is listening on port:' + port);
