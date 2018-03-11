import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';

const ArtistSearchBar = ({ history }) => (
  <SearchBar
    size="huge"
    placeholder="Search for an artist..."
    onEnter={
      (e) => { if (e.target.value != null && e.target.value.length) { history.push(`/artist/${e.target.value}`); } }
    }
  />
);

ArtistSearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ArtistSearchBar;
