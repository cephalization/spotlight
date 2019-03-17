import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab } from 'semantic-ui-react';

import { topUserTracksEndpoint } from '../../endpoints';
import { saveGeneralAuth } from '../../utils';
import { withAuth } from '../../Contexts/Authentication';
import TracksList from '../../Components/TracksCard/TracksList';

const TopTrackPane = ({ user, accessToken }) => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    if (user) {
      axios
        .get(topUserTracksEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          saveGeneralAuth(response.data.data.generalAuth);
          setTracks(response.data.data.items);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Failed to retrieve top tracks', error);
        });
    }
  }, [JSON.stringify(user)]);

  return (
    <Tab.Pane loading={loading}>
      {!loading && <TracksList style={{ maxHeight: 'unset' }} tracks={tracks} />}
    </Tab.Pane>
  );
};

export default withAuth(TopTrackPane);
