import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './IngredientCard.css';

const IngredientCard = (props) => {
  const { ingredient, index } = props;
  const urlMeal = 'https://www.themealdb.com/images/ingredients/';
  const urlDrink = 'https://www.thecocktaildb.com/images/ingredients/';

  return (
    <Link to="/comidas">
      <div
        className="ingredient-card"
        data-testid={ `${index}-ingredient-card` }
      >
        <div className="img-thumb">
          <img
            src={ (ingredient.strIngredient
              && `${urlMeal}${ingredient.strIngredient}-Small.png`)
              || (ingredient.strIngredient1
              && `${urlDrink}${ingredient.strIngredient1}-Small.png`) }
            data-testid={ `${index}-card-img` }
            alt={ ingredient.strIngredient || ingredient.strIngredient1 }
          />
        </div>
        <h3
          data-testid={ `${index}-card-name` }
        >
          { ingredient.strIngredient || ingredient.strIngredient1 }
        </h3>
      </div>
    </Link>
  );
};

export default IngredientCard;

IngredientCard.propTypes = {
  ingredient: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};