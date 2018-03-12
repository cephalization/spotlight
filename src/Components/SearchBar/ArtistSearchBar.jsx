import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';

const ArtistSearchBar = ({ history, disabled }) => (
  <SearchBar
    size="huge"
    placeholder="Search for an artist..."
    disabled={disabled}
    onEnter={
      (e) => {
        if (e.target.value != null && e.target.value.length && !disabled) {
          history.push(`/artist/${e.target.value}`);
        }
      }
    }
  />
);

ArtistSearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
};

ArtistSearchBar.defaultProps = {
  disabled: false,
};

export default ArtistSearchBar;
