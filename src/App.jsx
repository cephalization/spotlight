import { Responsive } from 'semantic-ui-react';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import ArtistPage from './Pages/ArtistPage/ArtistPage';
import ErrorPage from './Pages/ErrorPage/ErrorPage';

const baseURL = process.env.REACT_APP_BASE_URL != null
  ? process.env.REACT_APP_BASE_URL
  : '';

const App = () => (
  <Router basename={baseURL}>
    <Responsive>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/artist/:artistname" component={ArtistPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Responsive>
  </Router>
);

export default App;
