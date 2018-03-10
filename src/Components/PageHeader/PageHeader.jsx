import React from 'react';
import { Header, Container, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

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
const PageHeader = () => (
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
        <Link to="/"><FontAwesomeIcon icon="search" /> Spotlight</Link>
      </Header>
    </Container>
  </Segment>
);

export default PageHeader;
