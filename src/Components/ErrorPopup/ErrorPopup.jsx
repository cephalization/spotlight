import React from 'react';
import PropTypes from 'prop-types';
import { Message, Transition } from 'semantic-ui-react';

const styles = {
  position: 'absolute',
  top: '10px',
  width: 'inherit',
  zIndex: '1',
};

class ErrorPopup extends React.Component {
  constructor() {
    super();

    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.showPopupAfterMounting();
    this.hidePopupAfterInactivity();
  }

  showPopupAfterMounting() {
    setTimeout(() => { this.setState({ visible: true }); }, 500);
  }

  hidePopupAfterInactivity() {
    setTimeout(() => { this.setState({ visible: false }); }, 6500);
  }

  render() {
    const { header, error } = this.props;

    return (
      <Transition visible={this.state.visible} animation="scale" duration={500}>
        <Message
          negative
          floating
          style={styles}
          onDismiss={() => this.setState({ visible: false })}
        >
          <Message.Header>{header}</Message.Header>
          <pre>{error}</pre>
        </Message>
      </Transition>
    );
  }
}

ErrorPopup.propTypes = {
  header: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};

export default ErrorPopup;
