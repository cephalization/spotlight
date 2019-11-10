import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardGroup, Tab } from "semantic-ui-react";

import { topUserArtistsEndpoint } from "../../endpoints";
import { saveGeneralAuth } from "../../utils";
import ArtistCard from "../../Components/ArtistCard/ArtistCard";
import { withAuth } from "../../Contexts/Authentication";

const TopArtistPane = ({ user, accessToken }) => {
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    if (user) {
      axios
        .get(topUserArtistsEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          saveGeneralAuth(response.data.data.generalAuth);
          setArtists(response.data.data.items);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.error("Failed to retrieve top artists", error);
        });
    }
  }, [JSON.stringify(user)]);

  return (
    <Tab.Pane loading={loading}>
      {!loading && (
        <CardGroup stackable centered itemsPerRow={4}>
          {artists.map(artist => (
            <ArtistCard artist={artist} key={artist.name} compact />
          ))}
        </CardGroup>
      )}
    </Tab.Pane>
  );
};

export default withAuth(TopArtistPane);
