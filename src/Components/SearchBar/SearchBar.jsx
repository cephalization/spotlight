import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

const SearchBar = ({
  size, placeholder, onEnter, disabled, loading,
}) => (
  <Input
    fluid
    size={size}
    icon={{
      name: loading ? 'spinner' : 'search',
      loading,
      disabled,
    }}
    placeholder={placeholder}
    onKeyPress={(e) => {
      if (e.key === 'Enter') {
        onEnter(e);
      }
    }}
    tabIndex="0"
  />
);

SearchBar.propTypes = {
  size: PropTypes.string,
  placeholder: PropTypes.string,
  onEnter: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

SearchBar.defaultProps = {
  size: 'small',
  placeholder: '',
  onEnter: (e) => {
    e.preventDefault();
  },
  loading: false,
  disabled: false,
};

export default SearchBar;
