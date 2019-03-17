import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, Dimmer, Loader } from 'semantic-ui-react';
import TracksList from './TracksList';
import { topArtistTracksEndpoint } from '../../endpoints';
import { saveGeneralAuth, loadGeneralAuth } from '../../utils';

const getInitState = () => ({
  tracks: [],
  loading: true,
});

class TracksCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = getInitState();
    this.card = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.artistID !== '' && this.props.artistID !== prevProps.artistID) {
      this.handleTopTracksRequest(this.props.artistID);
    }

    if (this.props.artistID === '' && prevProps.artistID !== '') {
      // The artist ID is empty, must be getting a new artist
      // reset the state of this component
      this.setState(getInitState());
    }
  }

  handleTopTracksRequest(artistID) {
    axios
      .post(topArtistTracksEndpoint, {
        data: {
          artistID,
          generalAuth: loadGeneralAuth(),
        },
      })
      .then((response) => {
        saveGeneralAuth(response.data.data.generalAuth);
        this.setState({
          loading: false,
          tracks: response.data.data.tracks,
        });
      })
      .catch((error) => {
        this.setState({
          ...getInitState(),
          loading: false,
        });
        this.props.onError(error, 'An error occured searching for top tracks...');
      });
  }

  render() {
    const fluid = this.props.width != null && this.props.width < 667;
    return (
      <Card fluid={fluid}>
        <Card.Content>
          <Card.Header>Top Tracks</Card.Header>
        </Card.Content>
        <Card.Content className="no-side-padding">
          {this.state.loading && (
            <Dimmer active inverted>
              <Loader inverted>Loading Top Tracks</Loader>
            </Dimmer>
          )}
          {!this.state.loading && <TracksList tracks={this.state.tracks} />}
        </Card.Content>
      </Card>
    );
  }
}

TracksCard.propTypes = {
  artistID: PropTypes.string.isRequired,
  width: PropTypes.number,
  onError: PropTypes.func,
};

TracksCard.defaultProps = {
  width: null,
  onError: () => {},
};

export default TracksCard;
