class GoogleServices {
  constructor() {
    this.configuration = {
      key: 'AIzaSyCoT4fBdYxTl1PeUHdlY4Z1YhoDrSAlmB4',
      libraries: 'places'
    }

    // Bind methods.
    this.loadGoogleAPI = this.loadGoogleAPI.bind(this);
    this.geolocateUser = this.geolocateUser.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
  }

  /**
   * function loadGoogleAPI, inserts google maps api
   * script source into the application. This function will
   * be called before map initialization after the component
   * mounted so we can have access to the global 'google' object.
   *
   * @return {Promise}
   */
  loadGoogleAPI() {
    let configuartionReference = this.configuration;
    return new Promise((resolve, reject) => {
      // No need to reload the script if it already exists.
      // This would only happen on hot reload. So this is a
      // development conditional.
      if (!window.google) {
        const googleMapScript = document.createElement('script');
        googleMapScript.src =
          `https://maps.googleapis.com/maps/api/js?` +
          `key=${configuartionReference.key}` +
          `&libraries=${configuartionReference.libraries}`;
        document.body.appendChild(googleMapScript);
        // Resolve promise. If there isnt a event listener
        // once the script is loaded, we never will know when
        // the window.google variable becomes set. And we need
        // that variable to initialize the map.
        googleMapScript.addEventListener('load', () => {
          resolve();
        });
        googleMapScript.addEventListener('error', () => {
          reject();
        });
      } else {
        resolve();
      }
    });
  }

  /**
   * function geolocateUser, prompts user with geolocation modal,
   * if accepeted returns users coodirenates.
   *
   * @return {Promise}
   */
  geolocateUser() {
    return new Promise((resolve, reject) => {
      let geocoder = new window.google.maps.Geocoder();
      if (navigator.geolocation) {
        // Get user's geo position.
        navigator.geolocation.getCurrentPosition((position) => {
          // Geocode user's lat and long.
          geocoder.geocode({
            latLng: new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            )}, (results, status) => {
              // Geocode was a success.
              if (status === google.maps.GeocoderStatus.OK) {
                // Return the formatted address of the
                // users geolocation to insert into
                // the client.
                resolve(results[0].formatted_address);
              } else {
                reject();
              }
            });
        }, (error) => {
          // Geolcoation denied.
          if (error.code === error.PERMISSION_DENIED) {
            reject();
          }
        });
      } else {
        reject();
      }
    });
  }

  /**
   * function getRestaurants, uses google maps
   * api for the library places. Returns a promise
   * with an array of restaurants based on the
   * parameters passed.
   *
   * @param  {String} location, location address.
   * @param  {String} maxprice, range from 1-4.
   * @return {Promise}
   */
  getRestaurants(location, maxprice) {
    return new Promise((resolve, reject) => {
      // HTTP request.
      fetch('/restaurants', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          location: location,
          maxprice: maxprice
        }),
        method: 'POST'
      }).then((response) => {
        return response.json();
      }).then((restaurants) => {
        resolve(restaurants);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

// New instance of Routes.
const googleServices = new GoogleServices();

// Export googleServices.
export default googleServices;
