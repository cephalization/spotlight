import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchBar from './SearchBar';
import { artistSearchEndpoint } from '../../endpoints';
import {
  saveGeneralAuth,
  loadGeneralAuth,
} from '../../utils';

const getInitState = () => ({
  loading: false,
});

class ArtistSearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = getInitState();
    this.handleArtistSearchRequest = this.handleArtistSearchRequest.bind(this);
  }

  /**
   * Make a query to Spotlight API and retrieve artist data
   * If any request errors occur, log them in state
   *
   * @param {String} query user's search input for artist name (will be sanitized on server)
   */
  handleArtistSearchRequest(query) {
    axios.post(
      artistSearchEndpoint,
      {
        data: {
          artistQuery: query,
          generalAuth: loadGeneralAuth(),
        },
      },
    ).then((response) => {
      saveGeneralAuth(response.data.data.generalAuth);
      this.setState({ loading: false });
      this.props.history.push(`/artist/${response.data.data.artist.id}`);
    }).catch((error) => {
      this.setState({
        ...getInitState(),
        loading: false,
        errors: this.state.errors, // keep page errors when wiping the state
      });
      this.props.onError(error, 'An error occured searching for that artist...');
    });
  }

  render() {
    const { disabled } = this.props;
    const { loading } = this.state;

    return (
      <SearchBar
        size="huge"
        placeholder="Search for an artist..."
        disabled={disabled}
        loading={loading}
        onEnter={
          // Accept input when the enter key is pressed, and the value is valid
          (e) => {
            const search = e.target.value;
            if (search != null && search.length && !disabled) {
              this.setState({ loading: true }, () => this.handleArtistSearchRequest(search));
            }
          }
        }
      />
    );
  }
}

ArtistSearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
  onError: PropTypes.func,
};

ArtistSearchBar.defaultProps = {
  disabled: false,
  onError: () => {},
};

export default ArtistSearchBar;
