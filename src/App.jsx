import { Responsive } from 'semantic-ui-react';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import ErrorPage from './Pages/ErrorPage/ErrorPage';


const App = () => (
  <Router>
    <Responsive>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Responsive>
  </Router>
);

export default App;
