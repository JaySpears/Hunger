// Import dependencies.
import React, { Component } from 'react';

// Import globlal components.
import Container from './../../components/container';
import Header from './../../components/header';
import Footer from './../../components/footer';

// Import specific components.
import GoogleMaps from './components/map';
import Suggestions from './components/suggestions';
import Restaurants from './components/restaurants';

// Import scene styles.
import MainSceneStyles from './styles.scss';

// Import services.
import googleServices from './../../services/service.google';

class MainScene extends React.Component{
  constructor(){
    super();
    this.state = {
      googleApiLoaded: false,
      googleApiError: false,
      restaurants: null
    }
    this.getRestaurantData = this.getRestaurantData.bind(this);
  }

  /**
   * getRestaurantData, callback method to update state
   * once child component recieves restaurant data.
   */
  getRestaurantData(restaurants) {
    // Just showing the sexy spinner
    // for a little longer.
    setTimeout(() => {
      this.setState({
        restaurants: restaurants.results
      });
    }, 300);
  }

  /**
   * function componentDidMount, lifecycle method for when
   * the component is attached to the DOM.
   */
  componentDidMount() {
    googleServices.loadGoogleAPI().then(() => {
      this.setState({
        googleApiLoaded: true
      });
    }).catch(() => {
      this.setState({
        googleApiError: true
      });
    });
  }

  /**
   * function render, lifecycle method for rendering the component.
   */
  render(){
    return(
      <div>
        <Header></Header>
        <Container>
          <div className={this.state.restaurants ? "map-wrapper" : "flex-wrapper"}>
          { this.state.googleApiError ?
            <p>An error has occurred configuring Google Maps API.</p>
            : ''}
          { this.state.googleApiLoaded ?
            <div>
              { this.state.restaurants ?
                <div>
                  <GoogleMaps restaurants={this.state.restaurants}></GoogleMaps>
                  <Restaurants restaurants={this.state.restaurants}></Restaurants>
                </div>
                : <Suggestions sendRestaurantData={this.getRestaurantData}></Suggestions>}
            </div>
            : ''}
          </div>
        </Container>
        <Footer></Footer>
      </div>
    );
  }
}

// Export scene.
export default MainScene;
