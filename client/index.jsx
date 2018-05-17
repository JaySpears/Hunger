// React dependencies.
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Import scences.
import Routes from './routes/index.js';

// Render application.
ReactDOM.render(
  <Routes></Routes>,
  document.getElementById('application')
);

// Accept hot reload for development.
if (module.hot) {
  module.hot.accept();
}

// Exporting history for redirects.
export default history;
