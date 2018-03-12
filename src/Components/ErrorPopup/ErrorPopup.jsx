import React from 'react';
import PropTypes from 'prop-types';
import { Message, Transition } from 'semantic-ui-react';

class ErrorPopup extends React.Component {
  constructor() {
    super();
    this.showPopupAfterMounting = this.showPopupAfterMounting.bind(this);
    this.hidePopupAfterInactivity = this.hidePopupAfterInactivity.bind(this);

    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.showPopupAfterMounting();
    this.hidePopupAfterInactivity();
  }

  /**
   * Show this popup .5 seconds after it is mounted
   */
  showPopupAfterMounting() {
    setTimeout(() => { this.setState({ visible: true }); }, 500);
  }

  /**
   * Hide this popup after 6.5 seconds
   */
  hidePopupAfterInactivity() {
    setTimeout(() => { this.setState({ visible: false }); }, 6500);
  }

  render() {
    const { header, error, index } = this.props;

    const styles = {
      position: 'absolute',
      top: '',
      width: 'inherit',
      zIndex: '1',
    };

    // Line ErrorPopups below each other if there is more than one
    styles.top = `${10 + (77 * index)}px`;

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
  index: PropTypes.number.isRequired,
};

export default ErrorPopup;
