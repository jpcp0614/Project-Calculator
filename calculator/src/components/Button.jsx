import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/Button.css';

class Button extends Component {
  render() {
    const { click, double, label, operation, triple } = this.props;
    return (
      <button
        className={ `
          button ${operation ? 'operation' : ''}
          ${double ? 'double' : ''}
          ${triple ? 'triple' : ''}
        ` }
        onClick={ () => click && click(label) }
        type="button"
      >
        { label }
      </button>
    );
  }
}

Button.propTypes = ({
  click: PropTypes.func,
  label: PropTypes.any,
  operation: PropTypes.any,
}).isRequired;

export default Button;
