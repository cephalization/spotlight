import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, Icon, Image } from 'semantic-ui-react';
import ContentSegment from '../../Components/ContentSegment/ContentSegment';
import PageFooter from '../../Components/PageFooter/PageFooter';
import PageHeader from '../../Components/PageHeader/PageHeader';
import notFound from '../../Images/imagenotfound.png';
import {
  saveGeneralAuth,
  loadGeneralAuth,
} from '../../utils';

/**
 * Abstract this out, make endpoint constants that auto append this
 */
const baseURL = process.env.REACT_APP_BASE_URL != null
  ? process.env.REACT_APP_BASE_URL
  : '';

const artistCard = (loading, artist, search) => {
  const image = loading ? notFound : artist.images[0].url;
  const artistName = loading ? `Searching for ${search}...` : artist.name;
  const genres = loading ? '' : artist.genres.join(', ');
  const link = loading
    ? 'Loading artist information...'
    : <a href={artist.external_urls.spotify}>Artist&apos;s Spotify Profile</a>;
  const followers = loading ? 'Loading' : artist.followers.total;

  return (
    <Card>
      <Image src={image} />
      <Card.Content>
        <Card.Header>
          {artistName}
        </Card.Header>
        <Card.Meta>
          <span className="date">
            {genres}
          </span>
        </Card.Meta>
        <Card.Description>
          {link}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {followers} Followers
      </Card.Content>
    </Card>
  );
};

class ArtistPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: {},
      loading: true,
    };
  }

  componentDidMount() {
    axios.post(
      `${baseURL}/api/spotify/artist/`,
      {
        data: {
          artistQuery: this.props.match.params.artistname,
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
      console.log(error)
    ));
  }

  render() {
    const { match } = this.props;

    return (
      <div>
        <PageHeader />
        <ContentSegment>
          {artistCard(this.state.loading, this.state.artist, match.params.artistname)}
        </ContentSegment>
        <PageFooter />
      </div>
    );
  }
}

ArtistPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      artistname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ArtistPage;
