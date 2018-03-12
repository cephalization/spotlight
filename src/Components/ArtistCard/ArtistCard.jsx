import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import notFound from '../../Images/imagenotfound.png';

const ArtistCard = ({ loading, artist, search }) => {
  const image = loading ? notFound : _.get(artist, ['images', 0, 'url'], notFound);
  const artistName = loading ? `Searching for ${search}...` : _.get(artist, 'name', 'Artist Not Found!');
  const genres = loading ? '' : _.get(artist, 'genres', []).join(', ');
  const link = loading
    ? 'Loading artist information...'
    : (
      <Button
        style={{ backgroundColor: '#1DB954', color: '#FFF' }}
        href={_.get(artist, ['external_urls', 'spotify'], '/#')}
        disabled={_.get(artist, ['external_urls', 'spotify'], null) === null}
      >
        <FontAwesomeIcon icon={['fab', 'spotify']} /> Artist&apos;s Spotify Profile
      </Button>
    );
  const followers = loading ? 'Loading' : _.get(artist, ['followers', 'total'], 'N/A');

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

ArtistCard.propTypes = {
  loading: PropTypes.bool,
  artist: PropTypes.shape({
    images: PropTypes.array,
    external_urls: PropTypes.shape({ spotify: PropTypes.string }),
    name: PropTypes.string,
    followers: PropTypes.shape({ total: PropTypes.number }),
    genres: PropTypes.array,
  }),
  search: PropTypes.string,
};

ArtistCard.defaultProps = {
  loading: false,
  artist: {},
  search: 'Artist',
};

export default ArtistCard;
