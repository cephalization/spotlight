import React from 'react';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../Components/PageHeader/PageHeader';
import PageFooter from '../../Components/PageFooter/PageFooter';
import ContentSegment from '../../Components/ContentSegment/ContentSegment';

const ErrorPage = () => (
  <div>
    <PageHeader />
    <ContentSegment>
      <Header as="h1">Oops! Couldn&apos;t find this page.</Header>
      <Header size="small">
        <Link className="error" to="/">
          Go back home
        </Link>
      </Header>
    </ContentSegment>
    <PageFooter />
  </div>
);

export default ErrorPage;
