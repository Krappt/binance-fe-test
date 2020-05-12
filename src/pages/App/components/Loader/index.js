import React, { Component } from 'react';
import styles from './styles.module.scss';

class Loader extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.loader}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}

export default Loader;
