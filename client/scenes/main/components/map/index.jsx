// Import dependencies.
import React, { Component } from 'react';

// Import component styles.
import GoogleMapsStyles from './styles.scss';

class GoogleMaps extends React.Component{
  constructor(props) {
    super(props);
    this.google = {
      map: null,
      markers: [],
      configuration: {
        center: {lat: 39.5, lng: -98.35},
        zoom: 4
      }
    }
    // Bind Methods.
    this.initializeMap = this.initializeMap.bind(this);
    this.setMapMarkers = this.setMapMarkers.bind(this);
    this.setMapBounds = this.setMapBounds.bind(this);
  }

  //////////////////////
  // Custom Functions //
  //////////////////////

  /**
   * function initializeMap, establishes google maps onto the
   * applicaiton.
   */
  initializeMap() {
    this.google.map = new google.maps.Map(
      document.getElementById('map'), this.google.configuration
    );
    this.setMapMarkers(this.google.map, this.props.restaurants);
  }

  /**
   * function setMapMarkers, adds markers to google maps
   * based on the locations passed to it.
   *
   * @param {Object} map
   * @param {Array} restaurants [description]
   */
  setMapMarkers(map, restaurants) {
    let googleReference = this.google;
    for (let i = 0; i < restaurants.length; i++) {
      let restaurant = restaurants[i];
      let marker = new google.maps.Marker({
        position: {
          lat: restaurant.geometry.location.lat,
          lng: restaurant.geometry.location.lng
        },
        icon:
          `http://chart.apis.google.com/chart?` +
          `chst=d_map_pin_letter&chld=${(i + 1)}|FE6256|000000`,
        map: map
      });
      googleReference.markers.push(marker);
    }
    // Updated global constructor.
    this.google = googleReference;
    // Set map zoom based on locations.
    this.setMapBounds(map, googleReference.markers);
  }

  /**
   * function setMapBounds, sets the maps zoom
   * to fit in all location markers on the map.
   *
   * @param {Object} map
   * @param {Array} markers
   */
  setMapBounds(map, markers) {
    let bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }
    map.fitBounds(bounds);
  }

  ///////////////////////
  // Lifecycle Methods //
  ///////////////////////

  /**
   * function componentDidMount, lifecycle method for when
   * the component is attached to the DOM.
   */
  componentDidMount() {
    this.initializeMap();
  }

  /**
   * function render, lifecycle method for rendering the component.
   */
  render() {
    return(
      <div id="map"></div>
    );
  }
}

// Export component.
export default GoogleMaps;
