import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div
      data-testid="footer"
      className="d-flex p-2 bg-secondary align-items-center
      justify-content-between fixed-bottom"
    >
      <Link to="/bebidas">
        <img alt="Bebidas" data-testid="drinks-bottom-btn" src={ drinkIcon } />
      </Link>
      <Link to="/explorar">
        <img
          alt="Explorar"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
        />
      </Link>
      <Link to="comidas">
        <img alt="Comidas" data-testid="food-bottom-btn" src={ mealIcon } />
      </Link>
    </div>
  );
}

export default Footer;
