import React from 'react';
import PropTypes from 'prop-types';
import { Header, Button } from 'semantic-ui-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PageHeader from '../../Components/PageHeader/PageHeader';
import PageFooter from '../../Components/PageFooter/PageFooter';
import ContentSegment from '../../Components/ContentSegment/ContentSegment';
import ArtistSearchBar from '../../Components/SearchBar/ArtistSearchBar';

const LandingPage = ({ history }) => (
  <div>
    <PageHeader />
    <ContentSegment>
      <Header as="h2">
        Search for an artist, see what they&apos;re up to
      </Header>
      <ArtistSearchBar history={history} />
      <ContentSegment>
        <Header as="h2">
          What can Spotlight do?
        </Header>
        <p className="lead">
          Spotlight links up with <FontAwesomeIcon icon={['fab', 'spotify']} /> Spotify
          to help you stay in touch with the music in your life. Track your music
          listening stats, keep track of upcoming music you want to listen to, and sync
          back up with your Spotify account.
        </p>
      </ContentSegment>
      <ContentSegment>
        <Header as="h3">
          <FontAwesomeIcon className="right-pad" icon="compass" size="lg" />
          Spotlight makes keeping up with your favorite artists easy
        </Header>
        <p className="lead">
          By using this service, you keep the artists you care about in the spotlight.
          Find out their recent releases, popular tracks, and tour locations.
          You can even subscribe to notifications to make sure you never miss your new
          favorite song!
        </p>
      </ContentSegment>
      <ContentSegment>
        <Header as="h3">
          <FontAwesomeIcon className="right-pad" icon="bell" size="lg" />
          Never forget about that new release again
        </Header>
        <p className="lead">
          Enjoy too much good music? Can&apos;t keep track of the releases you still need to
          listen to? Enter Spotlight. Add new releases to you Listen List, or have Spotlight
          do it for you. You&apos;ll never get stuck listening to the same music on loop again.
        </p>
      </ContentSegment>
      <ContentSegment>
        <Header as="h3">
          <FontAwesomeIcon className="right-pad" icon="user-circle" size="lg" />
          Interested? Create an Account!
        </Header>
        <p className="lead">
          Signing up will allow you to link your Spotify account and unlock the full potential
          of Spotlight!
        </p>
        <Button disabled primary>Create account</Button>
      </ContentSegment>
    </ContentSegment>
    <PageFooter />
  </div>
);

LandingPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default LandingPage;
