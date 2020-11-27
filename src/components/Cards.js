import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import RecipesContext from '../context/Context';

import '../css/Cards.css';

export default function Cards({ id }) {
  const { items, filters } = useContext(RecipesContext);

  if (items) {
    if (items.drinks) {
      if (items.drinks.length === 1 && filters.searchType !== 'category') {
        console.log(items.drinks[0]);
        return <Redirect to={ `/${id}/${items.drinks[0].idDrink}` } />;
      }
      return (
        <div className="cards-wrapper">
          {items.drinks.map((item, index) => (
            <Link key={ index } to={ `/${id}/${item.idDrink}` }>
              <div
                key={ index }
                className="item-card"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ item.strDrinkThumb }
                  data-testid={ `${index}-card-img` }
                  alt="imagem de drink"
                />
                <p data-testid={ `${index}-card-name` }>{item.strDrink}</p>
              </div>
            </Link>
          ))}
        </div>
      );
    } if (items.meals) {
      if (items.meals.length === 1 && filters.searchType !== 'category') {
        return <Redirect to={ `/${id}/${items.meals[0].idMeal}` } />;
      }
      return (
        <div className="cards-wrapper">
          {items.meals.map((item, index) => (
            <Link key={ index } to={ `/${id}/${item.idMeal}` }>
              <div
                key={ index }
                className="item-card"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ item.strMealThumb }
                  data-testid={ `${index}-card-img` }
                  alt="imagem de comida"
                />
                <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  }
  return <div>Faça uma busca</div>;
}

Cards.propTypes = {
  id: PropTypes.string.isRequired,
};