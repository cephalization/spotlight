import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CardGroup, Tab } from 'semantic-ui-react';

import { withAuth } from '../../Contexts/Authentication';
import PageHeader from '../../Components/PageHeader/PageHeader';
import PageFooter from '../../Components/PageFooter/PageFooter';
import ContentSegment from '../../Components/ContentSegment/ContentSegment';
import { topUserArtistsEndpoint } from '../../endpoints';
import { saveGeneralAuth } from '../../utils';
import ArtistCard from '../../Components/ArtistCard/ArtistCard';

const StatsPage = ({ user, login, accessToken }) => {
  if (!user) {
    login();
  }

  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(topUserArtistsEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          saveGeneralAuth(response.data.data.generalAuth);
          setArtists(response.data.data.items);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Failed to retrieve artist', error);
        });
    }
  }, [JSON.stringify(user)]);

  const TopArtistsTab = (
    <Tab.Pane>
      <CardGroup stackable centered itemsPerRow={4}>
        {artists.map(artist => (
          <ArtistCard artist={artist} key={artist.name} compact />
        ))}
      </CardGroup>
    </Tab.Pane>
  );
  const TopTracksTab = <Tab.Pane>Coming soon...</Tab.Pane>;

  const panes = [
    { menuItem: 'Top Artists (recently)', render: () => TopArtistsTab },
    { menuItem: 'Top Tracks (recently)', render: () => TopTracksTab },
  ];

  return (
    <React.Fragment>
      <PageHeader />
      <ContentSegment>
        {loading && 'Loading...'}
        {!loading && <Tab panes={panes} />}
      </ContentSegment>
      <PageFooter />
    </React.Fragment>
  );
};

export default withAuth(StatsPage);
