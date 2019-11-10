import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Card, Grid, Dimmer, Loader } from "semantic-ui-react";
import TracksList from "../TracksCard/TracksList";
import AlbumsList from "./AlbumsList";
import { tracksEndpoint, albumsEndpoint } from "../../endpoints";
import { saveGeneralAuth, loadGeneralAuth, sortDate } from "../../utils";

const getInitState = () => ({
  tracks: [],
  albums: [],
  selectedAlbum: "",
  loading: true,
  tracksLoading: false
});

class AlbumsCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = getInitState();
    this.albumSelected = this.albumSelected.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // Make request for Albums
    if (
      this.props.artistID !== "" &&
      this.props.artistID !== prevProps.artistID
    ) {
      this.handleAlbumsRequest(this.props.artistID);
    }

    // Make request for album tracks
    if (
      this.state.selectedAlbum !== "" &&
      this.state.selectedAlbum !== prevState.selectedAlbum
    ) {
      this.handleTracksRequest(this.state.selectedAlbum);
    }

    // Clear tracks if album is unselected
    if (this.state.selectedAlbum === "" && prevState.selectedAlbum !== "") {
      this.setState({ tracks: [] });
    }

    // Clear all data is artist is empty
    if (this.props.artistID === "" && prevProps.artistID !== "") {
      // The artist ID is empty, must be getting a new artist
      // reset the state of this component
      this.setState(getInitState());
    }
  }

  handleTracksRequest(albumID) {
    this.setState({ tracksLoading: true }, () =>
      axios
        .post(tracksEndpoint, {
          data: {
            albumID,
            generalAuth: loadGeneralAuth()
          }
        })
        .then(response => {
          saveGeneralAuth(response.data.data.generalAuth);
          this.setState({
            tracksLoading: false,
            tracks: response.data.data.tracks
          });
        })
        .catch(error => {
          this.setState({
            tracks: [],
            tracksLoading: false,
            selectedAlbum: ""
          });
          this.props.onError(error, "An error occured searching for albums...");
        })
    );
  }

  handleAlbumsRequest(artistID) {
    this.setState({ loading: true }, () =>
      axios
        .post(albumsEndpoint, {
          data: {
            artistID,
            generalAuth: loadGeneralAuth()
          }
        })
        .then(response => {
          saveGeneralAuth(response.data.data.generalAuth);
          this.setState({
            loading: false,
            // Sort the albums by date decending from newest
            albums: response.data.data.albums.sort(sortDate).reverse()
          });
        })
        .catch(error => {
          this.setState({
            ...getInitState(),
            loading: false
          });
          this.props.onError(error, "An error occured searching for albums...");
        })
    );
  }

  albumSelected(albumID) {
    this.setState({ selectedAlbum: albumID });
  }

  render() {
    const tracksMessage = () => {
      let message;

      if (this.state.tracksLoading) {
        message = "Loading tracks";
      } else if (!this.state.selectedAlbum) {
        message = "Select an album";
      }

      return message;
    };

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Albums</Card.Header>
        </Card.Content>
        <Card.Content className="no-margin">
          {this.state.loading && (
            <Dimmer active inverted>
              <Loader inverted>Loading Albums</Loader>
            </Dimmer>
          )}
          {!this.state.loading && (
            <Grid className="no-margin" columns={2} divided>
              <Grid.Column className="no-padding">
                <AlbumsList
                  albums={this.state.albums}
                  onSelect={this.albumSelected}
                  selectedAlbum={this.state.selectedAlbum}
                />
              </Grid.Column>
              <Grid.Column className="no-padding">
                <TracksList
                  tracks={this.state.tracks}
                  showAlbumInfo={false}
                  emptyMessage={tracksMessage()}
                />
              </Grid.Column>
            </Grid>
          )}
        </Card.Content>
      </Card>
    );
  }
}

AlbumsCard.propTypes = {
  artistID: PropTypes.string.isRequired,
  width: PropTypes.number,
  onError: PropTypes.func
};

AlbumsCard.defaultProps = {
  width: null,
  onError: () => {}
};

export default AlbumsCard;
