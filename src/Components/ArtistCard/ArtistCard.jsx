import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import notFound from '../../Images/imagenotfound.png';

const ArtistCard = ({
  loading,
  artist,
  search,
  compact,
  width,
  ...props
}) => {
  const image = loading ? notFound : _.get(artist, ['images', 0, 'url'], notFound);
  const artistName = loading ? `Searching for ${search}...` : _.get(artist, 'name', 'Artist Not Found!');
  const genres = loading ? [] : _.get(artist, 'genres', []);
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
  const compactProps = {
    floated: 'right',
    size: 'tiny',
    style: {
      height: '100px',
      width: '100px',
      objectFit: 'cover',
      borderRadius: '80%',
    },
  };
  const fullSizeProps = {
    style: {
      height: '300px',
      width: '300px',
      objectFit: 'cover',
    },
  };
  const fluid = !compact && width != null && width < 667;

  return (
    <Card {...props} fluid={fluid}>
      {!compact ? <Image src={image} centered {...fullSizeProps} /> : null}
      <Card.Content>
        {compact ? <Image src={image} {...compactProps} /> : null}
        <Card.Header>
          {!compact ? artistName : <Link className="spotify-link" to={`/artist/${artist.id}`}>{artistName}</Link> }
        </Card.Header>
        <Card.Meta>
          <span className="date">
            {compact ? genres.join(', ') : genres.filter((v, i) => i < 3).join(', ')}
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
  compact: PropTypes.bool,
  width: PropTypes.number,
};

ArtistCard.defaultProps = {
  loading: false,
  artist: {},
  search: 'Artist',
  compact: false,
  width: null,
};

export default ArtistCard;
