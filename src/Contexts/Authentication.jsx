import React from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import axios from 'axios';
import { loginEndpoint, userEndpoint } from '../endpoints';

export const AuthenticationContext = React.createContext();

const getInitialAuthState = () => ({
  isLoggedIn: false,
  user: null,
  accessToken: null,
  refreshToken: null,
});

const clearAuthenticationCookies = () => console.log('Will clear cookies upon implementation');

/**
 * Login a user
 *
 * onSuccess: Store user information, save cookie
 * onFailure: Wipe user information, clear cookies
 */
const startLogin = () => {
  window.location.href = loginEndpoint;
};

/**
 * Authentication Provider
 *
 * Handles user authentication: Stores auth information in state,
 * disseminates auth information via context
 */
class AuthenticationProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = getInitialAuthState();
    this.onAuthRedirect = this.onAuthRedirect.bind(this);
    this.logout = this.logout.bind(this);
  }

  /**
   * Parse query string params from URL, fetch spotify user, return promise
   */
  onAuthRedirect() {
    const tokens = qs.parse(window.location.search);

    if (tokens.access_token && tokens.refresh_token) {
      axios
        .get(userEndpoint, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        })
        .then((response) => {
          this.setState({
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            user: response.data.data.user,
            isLoggedIn: true,
          });
        })
        .catch(() => this.setState(getInitialAuthState()));
    }
  }

  /**
   * Logout a user
   *
   * Clear authentication state and then clear cookies
   */
  logout() {
    this.setState(getInitialAuthState(), clearAuthenticationCookies);
  }

  render() {
    const context = {
      ...this.state,
      login: startLogin,
      logout: this.logout,
      onAuthRedirect: this.onAuthRedirect,
    };

    return (
      <AuthenticationContext.Provider value={context}>
        {this.props.children}
      </AuthenticationContext.Provider>
    );
  }
}

AuthenticationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Wrap a component in AuthenticationProvider
 *
 * @param {React.Component} Component node to be wrapped in AuthenticationProvider
 *
 * @return {React.Component} wrapped in AuthenticationProvider
 */
const withAuthProvider = Component => props => (
  <AuthenticationProvider>
    <Component {...props} />
  </AuthenticationProvider>
);

/**
 * Provide authentication related functions to a component via props
 *
 * @param {React.Component} Component node to be wrapped in AuthenticationContext.Consumer
 *  This node will be passed props from the authentication context
 */
export const withAuth = Component => props => (
  <AuthenticationContext.Consumer>
    {context => <Component {...context} {...props} />}
  </AuthenticationContext.Consumer>
);

export default withAuthProvider;
