import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

const SearchBar = ({ size, placeholder, onEnter }) => (
  <Input
    fluid
    size={size}
    icon={{
      name: 'search',
      circular: true,
      link: true,
      // onClick: onEnter figure out better way to link input value to this fn,
    }}
    placeholder={placeholder}
    onKeyPress={(e) => { if (e.key === 'Enter') { onEnter(e); } }}
    tabIndex="0"
  />
);

SearchBar.propTypes = {
  size: PropTypes.string,
  placeholder: PropTypes.string,
  onEnter: PropTypes.func,
};

SearchBar.defaultProps = {
  size: 'small',
  placeholder: '',
  onEnter: (e) => { e.preventDefault(); },
};

export default SearchBar;
