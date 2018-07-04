const baseURL = process.env.REACT_APP_BASE_URL != null
  ? process.env.REACT_APP_BASE_URL
  : '';

export const artistSearchEndpoint = `${baseURL}/api/spotify/artist-search/`;
export const artistEndpoint = `${baseURL}/api/spotify/artist/`;
export const relatedArtistsEndpoint = `${baseURL}/api/spotify/relatedartists/`;
export const topTracksEndpoint = `${baseURL}/api/spotify/toptracks/`;

export default [artistEndpoint, relatedArtistsEndpoint];
