import React from "react";
import { Header, Container, Segment, Menu, Image } from "semantic-ui-react";
import _ from "lodash";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { loginEndpoint } from "../../endpoints";
import { withAuth } from "../../Contexts/Authentication";
import ArtistSearchBar from "../SearchBar/ArtistSearchBar";

const styles = {
  headerSegment: {
    paddingTop: "3em",
    paddingBottom: "1.5em",
    minHeight: "150px",
    backgroundColor: "#222"
  },
  headerBrand: {
    fontSize: "3.5em"
  }
};

const getElementWindowTop = elem =>
  elem && typeof elem.getBoundingClientRect === "function"
    ? elem.getBoundingClientRect().top -
      document.body.getBoundingClientRect().top
    : 0;

/**
 * Main Page Header and Brand
 */
class PageHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sticky: false
    };

    this.hero = React.createRef();
    this.shouldBecomeSticky = this.shouldBecomeSticky.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.shouldBecomeSticky);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.shouldBecomeSticky);
  }

  /**
   * When the hero container scrolls out of view, make navbar sticky
   */
  shouldBecomeSticky() {
    const hero = this.hero.current;
    const elementTop = getElementWindowTop(hero);
    const elementBottom = elementTop + hero.clientHeight;

    if (
      elementBottom < window.scrollY ||
      elementTop >= window.scrollY + window.innerHeight
    ) {
      this.setState({ sticky: true });
    } else if (this.state.sticky) {
      this.setState({ sticky: false });
    }
  }

  render() {
    const { user, logout } = this.props;
    const { sticky } = this.state;

    return (
      <Segment vertical textAlign="center" style={styles.headerSegment}>
        <div ref={this.hero}>
          <Container text>
            <Header inverted as="h1" style={styles.headerBrand}>
              <Link className="hero" to="/">
                <FontAwesomeIcon icon="search" /> Spotlight
              </Link>
            </Header>
          </Container>
        </div>
        <Container className="top-pad">
          <Menu inverted borderless fluid fixed={sticky ? "top" : null}>
            <Container>
              {user !== null ? (
                <React.Fragment>
                  <Menu.Item>
                    <Image
                      size="mini"
                      circular
                      src={_.get(user, ["images", 0, "url"], "")}
                    />
                  </Menu.Item>
                  <Menu.Item>{user.id}</Menu.Item>
                  <Menu.Item as={Link} to="/profile">
                    Profile Statistics
                  </Menu.Item>
                  <Menu.Item>
                    <ArtistSearchBar fluid={false} size="small" inverted />
                  </Menu.Item>

                  <Menu.Menu position="right">
                    <Menu.Item onClick={logout}>Logout</Menu.Item>
                  </Menu.Menu>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Menu.Item>
                    <ArtistSearchBar fluid={false} size="small" inverted />
                  </Menu.Item>
                  <Menu.Menu position="right">
                    <Menu.Item as="a" href={loginEndpoint}>
                      Login
                    </Menu.Item>
                  </Menu.Menu>
                </React.Fragment>
              )}
            </Container>
          </Menu>
        </Container>
      </Segment>
    );
  }
}

export default withAuth(PageHeader);
