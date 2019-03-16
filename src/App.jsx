import { Responsive } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import ArtistPage from './Pages/ArtistPage/ArtistPage';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import withAuthProvider from './Contexts/Authentication';
import LoginHandler from './Components/LoginHandler/LoginHandler';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    // eslint-ignore-next-line
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

ScrollToTop.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object])).isRequired,
};

const ScrollToTopOnRoute = withRouter(ScrollToTop);

const App = () => (
  <Router>
    <ScrollToTopOnRoute>
      <Responsive>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/artist/:artistname" component={ArtistPage} />
          <Route path="/success" component={LoginHandler} />
          <Route component={ErrorPage} />
        </Switch>
      </Responsive>
    </ScrollToTopOnRoute>
  </Router>
);

export default withAuthProvider(App);
