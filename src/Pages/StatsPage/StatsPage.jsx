import React from 'react';
import { Tab } from 'semantic-ui-react';

import { withAuth } from '../../Contexts/Authentication';
import PageHeader from '../../Components/PageHeader/PageHeader';
import PageFooter from '../../Components/PageFooter/PageFooter';
import ContentSegment from '../../Components/ContentSegment/ContentSegment';
import TopArtistPane from './TopArtistPane';
import TopTrackPane from './TopTrackPane';

const panes = [
  { menuItem: 'Top Artists (recently)', render: () => <TopArtistPane /> },
  { menuItem: 'Top Tracks (recently)', render: () => <TopTrackPane /> },
];

const StatsPage = ({ user, login }) => {
  if (!user) {
    login();
  }

  return (
    <React.Fragment>
      <PageHeader />
      <ContentSegment>{<Tab panes={panes} />}</ContentSegment>
      <PageFooter />
    </React.Fragment>
  );
};

export default withAuth(StatsPage);
