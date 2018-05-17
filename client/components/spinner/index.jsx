// Import dependencies.
import React, { Component } from 'react';

// Import styles.
import SpinnerStyles from './styles.scss';

class Spinner extends React.Component {
  render() {
    return (
      <div className="spinner">
        <div className="container">
          <div className="wrapper">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      </div>
    )
  }
}

// Export component.
export default Spinner;
