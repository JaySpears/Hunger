// Dependencies.
import path from 'path';
import { app } from './../index.js';

// Users Controller.
import googleController from './../controllers/controller.google.js';

///////////////////////////////////
// Google Route Class Definition //
///////////////////////////////////

class GoogleRoutes {
  constructor() {
    // Bind methods.
    this.GetRestaurants = this.GetRestaurants.bind(this);
  }

  /**
   * GetRestaurants, since you need CORS access
   * to get data from google maps api, we will be retrieving
   * 3rd party data from the server. This data will be restaurants
   * based on params.
   *
   * @param {Object} req
   * @param {Object} res
   */
  GetRestaurants(req, res) {
    googleController.GetRestaurants(req).then((restaurants) => {
      res.status(200).send(restaurants);
    }).catch(() => {
      res.status(500).send();
    });
  }
}

// New instance of Routes.
const googleRoutes = new GoogleRoutes();

// Export googleRoutes.
export default googleRoutes;
