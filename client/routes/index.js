// Import Dependencies.
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Import Scences.
import MainScene from '../scenes/main/index.jsx';

// Set up routes.
class Routes extends React.Component{
  render(){
    return(
      <Router>
        <Route component={MainScene} path='/' />
      </Router>
    )
  }
}

// Export routes.
export default Routes;
