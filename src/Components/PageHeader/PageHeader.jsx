import React from 'react';
import { Header, Container, Segment, Menu, Image } from 'semantic-ui-react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { loginEndpoint } from '../../endpoints';
import { withAuth } from '../../Contexts/Authentication';

const styles = {
  headerSegment: {
    paddingTop: '3em',
    paddingBottom: '1.5em',
    minHeight: '150px',
    backgroundColor: '#222',
  },
  headerBrand: {
    fontSize: '3.5em',
  },
};

/**
 * Main Page Header and Brand
 */
const PageHeader = ({ user, logout }) => (
  <Segment
    vertical
    textAlign="center"
    style={styles.headerSegment}
  >
    <Container text>
      <Header
        inverted
        as="h1"
        style={styles.headerBrand}
      >
        <Link className="hero" to="/"><FontAwesomeIcon icon="search" /> Spotlight</Link>
      </Header>
    </Container>
    <Container className="top-pad">
      <Menu inverted borderless fluid>
        {user !== null
            ? <Menu.Item><Image size="mini" circular src={_.get(user, ['images', 0, 'url'], '')} /></Menu.Item>
            : null
        }
        {user !== null
          ? <Menu.Item>{user.id}</Menu.Item>
          : <Menu.Item as="a" href={loginEndpoint}>Login</Menu.Item>
        }
        {user !== null
            ? <Menu.Item onClick={logout}>Logout</Menu.Item>
            : null
        }
      </Menu>
    </Container>
  </Segment>
);

export default withAuth(PageHeader);
