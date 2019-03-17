import React from 'react';
import { Feed } from 'semantic-ui-react';
import { toTimestamp } from '../../utils';

const styles = {
  overflowY: 'auto',
  maxHeight: '400px',
  minHeight: '400px',
  paddingLeft: '1em',
};

const TracksList = ({
  tracks, showAlbumInfo, emptyMessage, style,
}) => (
  <Feed style={{ ...styles, ...style }}>
    {tracks.map((track, i) => (
      <Feed.Event className="track-item" key={track.name}>
        {showAlbumInfo ? (
          <Feed.Label image={track.album.images[0].url} />
        ) : (
          <Feed.Label>{i + 1}</Feed.Label>
        )}
        <Feed.Content>
          <Feed.Summary>
            <a className="spotify-link" href={track.external_urls.spotify} target="_blank">
              {track.name}
            </a>
            <Feed.Date>{toTimestamp(track.duration_ms)}</Feed.Date>
          </Feed.Summary>
          {showAlbumInfo && (
            <Feed.Extra>
              <a className="spotify-link" href={track.album.external_urls.spotify} target="_blank">
                {track.album.name}
              </a>
            </Feed.Extra>
          )}
        </Feed.Content>
      </Feed.Event>
    ))}
    {tracks.length === 0 && (
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>{emptyMessage}</Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    )}
  </Feed>
);

TracksList.defaultProps = {
  showAlbumInfo: true,
  emptyMessage: 'No tracks available',
  style: {},
};

export default TracksList;
