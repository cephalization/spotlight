import React from 'react';
import { Header } from 'semantic-ui-react';

import { withAuth } from '../../Contexts/Authentication';
import PageHeader from '../../Components/PageHeader/PageHeader';
import PageFooter from '../../Components/PageFooter/PageFooter';
import ContentSegment from '../../Components/ContentSegment/ContentSegment';

const StatsPage = () => (
  <React.Fragment>
    <PageHeader />
    <ContentSegment>
      <Header as="h1">Profile Statistics</Header>
    </ContentSegment>
    <PageFooter />
  </React.Fragment>
);

export default withAuth(StatsPage);
