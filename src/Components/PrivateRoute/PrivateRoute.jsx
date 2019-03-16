import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../../Contexts/Authentication';

/**
 * Create a route that redirects if the user is not logged in
 * e.g. a profile page
 *
 * @param {object} props destructured react props
 */
const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isLoggedIn) {
        return <Component {...props} />;
      }

      return (
        <Redirect
          to={{
            pathname: '/',
            state: {
              error: 'Must be logged in to access that page!',
            },
          }}
        />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withAuth(PrivateRoute);
