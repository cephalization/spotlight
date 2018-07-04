import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import _ from 'lodash';
import ContentSegment from '../ContentSegment/ContentSegment';
import ArtistCard from '../ArtistCard/ArtistCard';
import TracksCard from '../TracksCard/TracksCard';

class MainArtist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: null,
    };
    this.updateWidth = this.updateWidth.bind(this);
  }

  componentDidMount() {
    // Ported to ES6 from https://developer.mozilla.org/en-US/docs/Web/Events/resize
    const throttle = (type, name, object) => {
      const obj = object || window;
      let running = false;
      const func = () => {
        if (running) { return; }
        running = true;
        requestAnimationFrame(() => {
          obj.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };
      obj.addEventListener(type, func);
    };

    throttle('resize', 'optimizedresize');
    window.addEventListener('optimizedresize', this.updateWidth);
  }

  updateWidth(e) {
    this.setState({ width: e.target.innerWidth });
  }

  render() {
    const {
      artist,
      loading,
      query,
      onError,
    } = this.props;

    const width = this.state.width || window.innerWidth;

    return (
      <ContentSegment>
        <Card.Group>
          <ArtistCard
            loading={loading}
            artist={artist}
            search={query}
            width={width}
          />
          <TracksCard
            artistID={_.get(artist, 'id', '')}
            onError={onError}
            width={width}
          />
        </Card.Group>
      </ContentSegment>
    );
  }
}

MainArtist.propTypes = {
  artist: ArtistCard.propTypes.artist.isRequired,
  loading: ArtistCard.propTypes.loading.isRequired,
  query: ArtistCard.propTypes.search.isRequired,
  onError: PropTypes.func,
};

MainArtist.defaultProps = {
  onError: () => {},
};

export default MainArtist;
