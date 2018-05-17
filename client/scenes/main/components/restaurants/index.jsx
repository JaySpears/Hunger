// Import dependencies.
import React, { Component } from 'react';

// Import styles.
import RestaurantsStyles from './styles.scss';

class Restaurants extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props);
  }

  render() {
    return(
      <div className="restaurants-wrapper">
        <ol>
        {this.props.restaurants.map((restaurant, index) => {
          return (
            <li key={index}>
              <h3>{restaurant.name}</h3>
              {(() => {
                switch (restaurant.price_level) {
                  case 1:
                    return <p className="pricing-wrapper"><span>Price Level: </span>$</p>
                  case 2:
                    return <p className="pricing-wrapper"><span>Price Level: </span>$$</p>
                  case 3:
                    return <p className="pricing-wrapper"><span>Price Level: </span>$$$</p>
                  case 4:
                    return <p className="pricing-wrapper"><span>Price Level: </span>$$$$</p>
                  default:
                    null
                  }
              })()}
              <a href={`https://www.google.com/maps/search/?api=1&query=${restaurant.formatted_address}`}>{restaurant.formatted_address}</a>
              <a className="directions" href={`https://www.google.com/maps/search/?api=1&query=${restaurant.formatted_address}`}>Get Directions</a>
            </li>
          )
        })}
        </ol>
      </div>
    )
  }
}

// Export component.
export default Restaurants;
