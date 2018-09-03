import React from 'react';
import { Header } from 'semantic-ui-react';
import PageHeader from '../../Components/PageHeader/PageHeader';
import PageFooter from '../../Components/PageFooter/PageFooter';
import ContentSegment from '../../Components/ContentSegment/ContentSegment';

const LoadingPage = () => (
  <div>
    <PageHeader />
    <ContentSegment>
      <Header as="h1">Logging in, this should only take a sec!</Header>
    </ContentSegment>
    <PageFooter />
  </div>
);

export default LoadingPage;
