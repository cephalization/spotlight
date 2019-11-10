import React from "react";
import { Segment, Container, Grid, Header, List } from "semantic-ui-react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

// Stylesheet object
const styles = {
  footerSegment: {
    padding: "5em 0em"
  }
};

/**
 * Main Page Footer
 */
const PageFooter = () => (
  <Segment inverted vertical style={styles.footerSegment}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="About" />
            <List link inverted>
              <List.Item as="a" href="http://anthonypowell.me/">
                <FontAwesomeIcon icon="id-badge" /> Portfolio
              </List.Item>
              <List.Item as="a" href="https://github.com/cephalization">
                <FontAwesomeIcon icon={["fab", "github"]} /> GitHub
              </List.Item>
              <List.Item as="a" href="https://twitter.com/cephalization">
                <FontAwesomeIcon icon={["fab", "twitter"]} /> Twitter
              </List.Item>
              <List.Item>
                Made with <FontAwesomeIcon icon="code" />
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4" inverted>
              Legal Stuff
            </Header>
            <p>
              Don&apos;t sue me please, I very much like not being in legal
              trouble. <br />
              All rights to their respective owners.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default PageFooter;
