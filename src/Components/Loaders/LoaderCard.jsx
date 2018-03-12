import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Card } from 'semantic-ui-react';
import ArtistCard from '../ArtistCard/ArtistCard';
import ContentSegment from '../ContentSegment/ContentSegment';

const generateCards = (limit) => {
  const cards = [];
  for (let i = 0; i < limit; i += 1) {
    cards.push(<ArtistCard key={i} loading compact />);
  }

  return cards;
};

const LoaderCard = ({ numCards, text }) => (
  <ContentSegment>
    <Dimmer active inverted>
      <Loader inverted>{text}</Loader>
    </Dimmer>
    <Card.Group stackable centered itemsPerRow={2}>
      {generateCards(numCards)}
    </Card.Group>
  </ContentSegment>
);

LoaderCard.propTypes = {
  numCards: PropTypes.number,
  text: PropTypes.string,
};

LoaderCard.defaultProps = {
  numCards: 1,
  text: 'Loading',
};

export default LoaderCard;
