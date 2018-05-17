import request from 'request';

//////////////////////////////////
// Google Controller Definition //
//////////////////////////////////

class GoogleController {
  constructor() {
    this.configuration = {
      key: 'AIzaSyCoT4fBdYxTl1PeUHdlY4Z1YhoDrSAlmB4'
    }
    // Binding Methods.
    this.GetRestaurants = this.GetRestaurants.bind(this);
  }

  /**
   * GetRestaurants, since you need CORS access
   * to get data from google maps api, we will be retrieving
   * 3rd party data from the server. This data will be restaurants
   * based on params.
   *
   * @param {Object} req
   * @return {Promise}
   */
  GetRestaurants(req) {
    return new Promise((resolve, reject) => {
      let configuartionReference = this.configuration;
      let requestUrl =
        `https://maps.googleapis.com/maps/api/place/textsearch/json` +
        `?query=${req.body.location}` +
        `&type=restaurant` +
        `&maxprice=${req.body.maxprice}` +
        `&radius=50000&hasNextPage=true&nextPage()=true` +
        `&key=${configuartionReference.key}`;
      request(requestUrl, (err, response, body) => {
        if (err) {
          reject(err);
        }
        resolve(body);
      });
    });
  }
}

// New instance of userController.
const googleController = new GoogleController();

// Export model instance.
export default googleController;
