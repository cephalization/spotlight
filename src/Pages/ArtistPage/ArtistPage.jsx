import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ContentSegment from '../../Components/ContentSegment/ContentSegment';
import PageFooter from '../../Components/PageFooter/PageFooter';
import PageHeader from '../../Components/PageHeader/PageHeader';
import ArtistCard from '../../Components/ArtistCard/ArtistCard';
import {
  saveGeneralAuth,
  loadGeneralAuth,
} from '../../utils';
import ArtistSearchBar from '../../Components/SearchBar/ArtistSearchBar';
import ErrorPopup from '../../Components/ErrorPopup/ErrorPopup';

/**
 * Abstract this out, make endpoint constants that auto append this
 */
const baseURL = process.env.REACT_APP_BASE_URL != null
  ? process.env.REACT_APP_BASE_URL
  : '';

const getInitState = () => (
  {
    artist: {},
    loading: true,
    errors: [],
  }
);

class ArtistPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleArtistRequest = this.handleArtistRequest.bind(this);

    this.state = getInitState();
  }

  componentDidMount() {
    this.handleArtistRequest(this.props.match.params.artistname);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.artistname !== newProps.match.params.artistname) {
      this.setState(getInitState(), this.handleArtistRequest(newProps.match.params.artistname));
    }
  }

  handleArtistRequest(query) {
    axios.post(
      `${baseURL}/api/spotify/artist/`,
      {
        data: {
          artistQuery: query,
          generalAuth: loadGeneralAuth(),
        },
      },
    ).then((response) => {
      saveGeneralAuth(response.data.data.generalAuth);
      this.setState({
        loading: false,
        artist: response.data.data.artist,
      });
    }).catch(error => (
      this.setState({
        ...getInitState(),
        loading: false,
        errors: [
          ...this.state.errors,
          <ErrorPopup
            key={this.state.errors.length + 1}
            header="An error occured searching for that artist..."
            error={error.toString()}
          />,
        ],
      })
    ));
  }

  render() {
    const { match, history } = this.props;

    return (
      <div>
        <PageHeader />
        <ContentSegment>
          {this.state.errors}
          <ArtistSearchBar disabled={this.state.loading} history={history} />
          <ArtistCard
            loading={this.state.loading}
            artist={this.state.artist}
            search={match.params.artistname}
          />
        </ContentSegment>
        <PageFooter />
      </div>
    );
  }
}

ArtistPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      artistname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ArtistPage;
