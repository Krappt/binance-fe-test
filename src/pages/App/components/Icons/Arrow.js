import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ArrowIcon extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { className, onClick } = this.props;
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} onClick={onClick}>
        <path d="M16 9v1.2L12 15l-4-4.8V9h8z" />
      </svg>
    );
  }
}

ArrowIcon.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

ArrowIcon.defaultProps = {
  className: '',
  onClick: null,
};

export default ArrowIcon;
