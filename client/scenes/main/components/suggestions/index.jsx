// Import dependencies.
import React, { Component } from 'react';

// Import global dependencies.
import Spinner from './../../../../components/spinner';

// Import styles.
import SuggestionsStyles from './styles.scss';

// Import services.
import googleServices from './../../../../services/service.google';

class Suggestions extends React.Component {
  constructor(props) {
    super(props);
    this.google = {
      autocomplete: null
    }
    this.state = {
      price: '',
      location: '',
      pendingRequest: false,
      errors: {
        price: false,
        location: false,
        geolocateUser: false
      }
    }
    // Bind Methods.
    this.initializeAutocomplete = this.initializeAutocomplete.bind(this);
    this.geolocateUser = this.geolocateUser.bind(this);
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  //////////////////////
  // Custom Functions //
  //////////////////////

  /**
   * function initializeAutocomplete, establishes google maps
   * autocomplete functionality to the location input element.
   */
  initializeAutocomplete() {
    let input = document.getElementById('autocomplete');
    this.google.autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(this.google.autocomplete, 'place_changed', () => {
      this.setState({
        location: input.value
      });
    });
  }

  /**
   * function geolocateUser, prompts the user with the
   * geolocation alert box. Afterwards we will get the
   * latitude and longitude from their location. Then we
   * will geocode that information into and address and
   * pass it into the address input field.
   */
  geolocateUser() {
    googleServices.geolocateUser().then((address) => {
      let input = document.getElementById('autocomplete');
      input.value = address;
      this.setState({
        location: address
      });
    }).catch(() => {
      this.setState({
        errors: Object.assign(this.state.errors, {
          geolocateUser: true
        })
      });
    });
  }

  /**
   * function handleInputChange, callback function to
   * be executed once a user updates the input field value.
   *
   * @param  {Object} event, user event.
   */
  handleInputChange(event) {
    this.setState({
      location: event.target.value
    });
  }

  /**
   * function handleRadioButtonChange, callback function to
   * be executed once a user updates the radio button value.
   *
   * @param  {Object} event, user event.
   */
  handleRadioButtonChange(event) {
    this.setState({
      price: event.target.value
    });
  }

  /**
   * function handleFormSubmit, submit function
   * once the user determines the location
   * and price of restaurants. This submit function
   * will trigger the googleServices.getRestaurants method.
   * Also does a validation check to ensure the user
   * has filled out the required form options.
   *
   * @param  {Object} event, user event.
   */
  handleFormSubmit(event) {
    event.preventDefault();
    let stateReference = this.state;
    let formValid = true;
    for (var prop in stateReference) {
      if (stateReference.hasOwnProperty(prop)) {
        if (stateReference[prop] === '') {
          formValid = false;
          this.setState({
            errors: Object.assign(this.state.errors, {
              [prop]: true
            })
          });
        }
      }
    }

    // Ensure required fields have values.
    if (formValid) {
      this.setState({
        pendingRequest: true
      });
      googleServices.getRestaurants(this.state.location, this.state.price)
        .then((restaurants) => {
          this.props.sendRestaurantData(restaurants);
          this.setState({
            pendingRequest: false
          });
        }).catch(() => {
          this.setState({
            pendingRequest: false
          });
        });
    }
  }

  ///////////////////////
  // Lifecycle Methods //
  ///////////////////////

  /**
   * function componentDidMount, lifecycle method for when
   * the component is attached to the DOM.
   */
  componentDidMount() {
    this.initializeAutocomplete();
  }

  /**
   * function render, lifecycle method for rendering the component.
   */
  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="price-selection">
            <h2>What're you trying to spend?</h2>
            <label htmlFor="price">
              <input type="radio" name="price" value="1" onChange={this.handleRadioButtonChange}/>
              <span className="amount">$</span>
            </label>
            <label htmlFor="price">
              <input type="radio" name="price" value="2" onChange={this.handleRadioButtonChange}/>
              <span className="amount">$$</span>
            </label>
            <label htmlFor="price">
              <input type="radio" name="price" value="3" onChange={this.handleRadioButtonChange}/>
              <span className="amount">$$$</span>
            </label>
            <label htmlFor="price">
              <input type="radio" name="price" value="4" onChange={this.handleRadioButtonChange}/>
              <span className="amount">$$$$</span>
            </label>
            { this.state.errors.price ?
              <p className="error">Please select a price.</p>
              : ''}
          </div>
          <div className="location-selection">
            <h2>Where do you want eat?</h2>
            <input type="text" id="autocomplete"
              value={this.state.location}
              onChange={this.handleInputChange}
              onSelect={this.handleInputChange}/>
            { this.state.errors.location ?
              <p className="error">Please select a location.</p>
              : ''}
            <a href="#" onClick={this.geolocateUser}>Use My Current Location</a>
          </div>
          <div className="button-wrapper">
            <button type="submit">Search</button>
          </div>
          <Spinner></Spinner>
          { this.state.pendingRequest ? <Spinner></Spinner> : ''}
        </form>
      </div>
    )
  }
}

// Export component.
export default Suggestions;
