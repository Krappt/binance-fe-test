import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StarIcon extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { className, onClick } = this.props;
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} onClick={onClick}>
        <path
          d="M21.4 10.8c-.3-1.1-.3-1.1-.7-2.1l-6-.1L12.8 3h-2.2l-2 5.6-5.9.1c-.3 1.1-.3 1.1-.7 2.1l4.8 3.6L5 20.1l1.8 1.3 4.9-3.4 4.9 3.4c.9-.7.9-.6 1.8-1.3l-1.8-5.7 4.8-3.6z"
          fill="currentColor"
        />
      </svg>
    );
  }
}

StarIcon.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StarIcon;
