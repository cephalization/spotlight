const baseURL = (process.env.API_BASE_URL != null && process.env.API_BASE_URL.length)
  ? process.env.API_BASE_URL
  : 'http://localhost:8081';

export const loginEndpoint = `${baseURL}/api/spotify/login/`;
export const artistSearchEndpoint = `${baseURL}/api/spotify/artist-search/`;
export const artistEndpoint = `${baseURL}/api/spotify/artist/`;
export const relatedArtistsEndpoint = `${baseURL}/api/spotify/relatedartists/`;
export const tracksEndpoint = `${baseURL}/api/spotify/tracks/`;
export const topTracksEndpoint = `${baseURL}/api/spotify/toptracks/`;
export const albumsEndpoint = `${baseURL}/api/spotify/albums/`;

export default [artistEndpoint, relatedArtistsEndpoint];
