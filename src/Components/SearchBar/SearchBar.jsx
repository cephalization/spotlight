import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

const SearchBar = ({ size }) => (
  <Input
    fluid
    size={size}
    icon={{ name: 'search', circular: true, link: true }}
    placeholder="Search for an artist..."
  />
);

SearchBar.propTypes = {
  size: PropTypes.string,
};

SearchBar.defaultProps = {
  size: 'small',
};

export default SearchBar;
