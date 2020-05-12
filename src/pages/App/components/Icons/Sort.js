import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../../assets/styles/_variables-theme.scss';

class SortIcon extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { className, onClick, direction } = this.props;
    const isUp = direction === 'asc';
    const isDown = direction === 'desc';
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} onClick={onClick}>
        <path d="M9 10.153V8.5L12.25 5l3.25 3.501v1.652H9z" fill={isUp ? styles.iconColorActive : styles.iconColor}></path>
        <path d="M15.5 13.257v1.652l-3.25 3.5L9 14.91v-1.652h6.5z" fill={isDown ? styles.iconColorActive : styles.iconColor}></path>
      </svg>
    );
  }
}

SortIcon.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.string,
  onClick: PropTypes.func,
};

SortIcon.defaultProps = {
  className: '',
  direction: null,
  onClick: null,
};

export default SortIcon;
