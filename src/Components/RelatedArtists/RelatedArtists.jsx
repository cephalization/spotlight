import React from "react";
import PropTypes from "prop-types";
import { Header, Card } from "semantic-ui-react";
import axios from "axios";
import ContentSegment from "../ContentSegment/ContentSegment";
import LoaderCard from "../Loaders/LoaderCard";
import ArtistCard from "../ArtistCard/ArtistCard";
import { relatedArtistsEndpoint } from "../../endpoints";
import { saveGeneralAuth, loadGeneralAuth } from "../../utils";

const getInitState = () => ({
  artists: [],
  loading: true
});

class RelatedArtists extends React.Component {
  constructor() {
    super();
    this.handleRelatedArtistsRequest = this.handleRelatedArtistsRequest.bind(
      this
    );

    this.state = getInitState();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.primaryArtistID !== prevProps.primaryArtistID &&
      this.props.primaryArtistID !== ""
    ) {
      // A new artist ID was received, re-query
      this.handleRelatedArtistsRequest(this.props.primaryArtistID);
    }

    if (this.props.primaryArtistID === "" && prevProps.primaryArtistID !== "") {
      // The artist ID is empty, must be getting a new artist
      // reset the state of this component
      this.setState(getInitState());
    }
  }

  /**
   * Make a query to Spotlight API and retrieve related artist data
   * If any request errors occur, log them in state
   *
   * @param {String} artistID artist id from spotify artist response
   */
  handleRelatedArtistsRequest(artistID) {
    axios
      .post(relatedArtistsEndpoint, {
        data: {
          artistID,
          generalAuth: loadGeneralAuth()
        }
      })
      .then(response => {
        saveGeneralAuth(response.data.data.generalAuth);
        this.setState({
          loading: false,
          artists: response.data.data.artists
        });
      })
      .catch(error => {
        this.setState({
          ...getInitState(),
          loading: false
        });
        this.props.onError(
          error,
          "An error occured searching for related artists..."
        );
      });
  }

  render() {
    return (
      <ContentSegment>
        <Header as="h3">Related Artists</Header>
        {// TODO: Clean this up, pure components with default props would be better
        // If the component is loading, show the loading cards
        // When it is done, show the artist cards or a 'not found' message
        this.state.loading ? (
          <LoaderCard numCards={4} text="Loading Related Artists..." />
        ) : (
          <Card.Group stackable centered itemsPerRow={2}>
            {this.state.artists.length
              ? this.state.artists.map(artist => (
                  <ArtistCard key={artist.name} artist={artist} compact />
                ))
              : "No related artists found."}
          </Card.Group>
        )}
      </ContentSegment>
    );
  }
}

RelatedArtists.propTypes = {
  primaryArtistID: PropTypes.string.isRequired,
  onError: PropTypes.func.isRequired
};

export default RelatedArtists;
