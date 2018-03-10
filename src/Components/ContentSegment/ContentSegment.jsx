import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Container } from 'semantic-ui-react';

// Stylesheet object
const styles = {
  segment: {
    minHeight: '150px',
  },
  container: {
    paddingTop: '3em',
    paddingBottom: '2em',
  },
};

/**
 * A standard segment of content for a page to consume
 *
 * @param {node} children child node to be rendered into the segment
 */
const ContentSegment = ({ children }) => (
  <Segment vertical style={styles.segment}>
    <Container style={styles.container}>
      {children}
    </Container>
  </Segment>
);

ContentSegment.propTypes = {
  // Child nodes to be rendered into the segment
  children: PropTypes.node.isRequired,
};

export default ContentSegment;
