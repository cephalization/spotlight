const baseURL =
  process.env.API_BASE_URL != null && process.env.API_BASE_URL.length
    ? process.env.API_BASE_URL
    : '';

export const loginEndpoint = 'http://localhost:8081/api/spotify/login/';
export const userEndpoint = `${baseURL}/api/spotify/user/`;
export const artistSearchEndpoint = `${baseURL}/api/spotify/artist-search/`;
export const artistEndpoint = `${baseURL}/api/spotify/artist/`;
export const relatedArtistsEndpoint = `${baseURL}/api/spotify/relatedartists/`;
export const tracksEndpoint = `${baseURL}/api/spotify/tracks/`;
export const topArtistTracksEndpoint = `${baseURL}/api/spotify/top-artist-tracks/`;
export const topUserTracksEndpoint = `${baseURL}/api/spotify/user/top/tracks`;
export const topUserArtistsEndpoint = `${baseURL}/api/spotify/user/top/artists`;
export const albumsEndpoint = `${baseURL}/api/spotify/albums/`;

export default [artistEndpoint, relatedArtistsEndpoint];
