import React from 'react';
import { Feed } from 'semantic-ui-react';

const styles = {
  overflowY: 'auto',
  maxHeight: '400px',
};

const TracksList = ({ tracks }) => (
  <Feed
    style={styles}
  >
    {tracks.map(track => (
      <Feed.Event key={track.name}>
        <Feed.Label image={track.album.images[0].url} />
        <Feed.Content>
          <Feed.Summary>
            <a
              className="spotify-link"
              href={track.external_urls.spotify}
              target="_blank"
            >
              {track.name}
            </a>
          </Feed.Summary>
          <Feed.Extra>
            <a
              className="spotify-link"
              href={track.album.external_urls.spotify}
              target="_blank"
            >
              {track.album.name}
            </a>
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    ))}
    {
      tracks.length === 0 &&
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>No tracks available</Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    }
  </Feed>
);

export default TracksList;
