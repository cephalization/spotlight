import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withAuth } from "../../Contexts/Authentication";

/**
 * Component that triggers user auth, and redirects to previous page
 */
class LoginHandler extends React.Component {
  componentDidMount() {
    this.props.onAuthRedirect();
  }

  render() {
    const { isLoggedIn } = this.props;

    return isLoggedIn ? (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    ) : null;
  }
}

LoginHandler.propTypes = {
  onAuthRedirect: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default withAuth(LoginHandler);
