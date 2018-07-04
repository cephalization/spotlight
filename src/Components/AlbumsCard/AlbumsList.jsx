import React from 'react';
import { Feed } from 'semantic-ui-react';

const styles = {
  overflowY: 'auto',
  maxHeight: '400px',
  minHeight: '400px',
};

const selectFunction = (onClick, current, selected) => (
  current !== selected
    ? () => onClick(current)
    : () => onClick('')
);

const AlbumsList = ({ albums, onSelect, selectedAlbum }) => (
  <Feed
    style={styles}
  >
    {albums.map(album => (
      <Feed.Event
        onClick={selectFunction(onSelect, album.id, selectedAlbum)}
        className={album.id !== selectedAlbum ? 'album-item' : 'selected-album-item'}
        key={album.name}
      >
        <Feed.Label image={album.images[0].url} />
        <Feed.Content>
          <Feed.Summary>
            <a
              className="spotify-link"
              href={album.external_urls.spotify}
              target="_blank"
            >
              {album.name}
            </a>
          </Feed.Summary>
          <Feed.Extra>
            <a
              className="spotify-link"
              href={album.artists[0].external_urls.spotify}
              target="_blank"
            >
              {album.artists[0].name}
            </a>
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Date>{album.release_date}</Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    ))}
    {
      albums.length === 0 &&
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>No albums available</Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    }
  </Feed>
);

export default AlbumsList;
