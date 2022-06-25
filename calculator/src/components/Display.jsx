import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/Display.css';

class Display extends Component {
  render() {
    const { value } = this.props;
    return (
      <div className="display">
        { value }
      </div>
    );
  }
}

Display.propTypes = ({
  value: PropTypes.any,
}).isRequired;

export default Display;
