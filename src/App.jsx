import { Responsive } from 'semantic-ui-react';
import React from 'react';
import PageHeader from './Components/PageHeader/PageHeader';
import PageFooter from './Components/PageFooter/PageFooter';

const App = () => (
  <Responsive>
    <PageHeader />
    <PageFooter />
  </Responsive>
);

export default App;
