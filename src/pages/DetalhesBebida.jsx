import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  requestApiDrinkDetails,
} from '../services/requestDrink';
import {
  recommendFoodsList,
} from '../services/requestFood';
import '../styles/Detalhes.css';
import buttonShare from '../styles/images/shareIcon.svg';
import whiteHeartIcon from '../styles/images/whiteHeartIcon.svg';
import blackHeartIcon from '../styles/images/blackHeartIcon.svg';
import { saveState, loadState } from '../services/localStorage';

function DetalhesBebida(props) {
  const zero = 0;
  const quinze = 15;
  const seis = 6;
  const favoriteRecipe = 'favoriteRecipes';
  const responseFavoriteStorage = loadState(favoriteRecipe, [])
    .some((element) => element.id === props.match.params.id);
  const [detailsDrink, setDetailsDrink] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [recommendDrink, setRecommendDrink] = useState([]);
  const [favoriteButton, setFavoriteButton] = useState(responseFavoriteStorage);

  useEffect(() => {
    requestApiDrinkDetails(props.match.params.id)
      .then((response) => {
        setDetailsDrink(response[0]);
      });
  }, []);

  const favoriteMark = () => {
    if (favoriteButton === false) {
      setFavoriteButton(true);
    } else {
      setFavoriteButton(false);
    }
  };

  const ingredientsFunc = () => {
    if (detailsDrink.length !== zero) {
      const array = [];
      for (let i = 1; i <= quinze; i += 1) {
        const detDrink = `${detailsDrink[`strIngredient${i}`]}`;
        const detMeasure = `${detailsDrink[`strMeasure${i}`]}`;
        const ingredient = `${detDrink} ${detMeasure}`;
        array.push(ingredient);
      }
      const arrayReturn = array.filter((element) => element !== 'null null');
      setArrayIngredients(arrayReturn);
    }
  };

  const saveFavoriteRecipe = () => {
    const { idDrink, strCategory, strDrink, strDrinkThumb, strAlcoholic } = detailsDrink;
    const loadFavoriteRecipe = loadState(favoriteRecipe, []);

    const response = loadFavoriteRecipe.filter((element) => element.id !== idDrink);
    if (loadFavoriteRecipe.length > response.length) {
      saveState(favoriteRecipe, response);
    } else {
      const payload = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      saveState(favoriteRecipe, [...loadFavoriteRecipe, payload]);
    }
    console.log(detailsDrink);
    favoriteMark();
  };

  const recommendDrinkFunction = async () => {
    if (detailsDrink.length !== zero) {
      const response = await recommendFoodsList();
      setRecommendDrink(response.meals.slice(zero, seis));
    }
  };

  useEffect(() => {
    ingredientsFunc();
    recommendDrinkFunction();
  }, [detailsDrink]);

  const copyBoard = () => {
    const url = `http://localhost:3000/bebidas/${props.match.params.id}`;
    const input = document.body.appendChild(document.createElement('input'));
    input.value = url;
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
    const divBtns = document.getElementById('btns');
    const newSpan = document.createElement('span');
    newSpan.innerHTML = 'Link copiado!';
    divBtns.appendChild(newSpan);
  };

  if (detailsDrink.length === zero) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img data-testid="recipe-photo" src={ detailsDrink.strDrinkThumb } alt="dk aspo" />
      <h2 data-testid="recipe-title">{detailsDrink.strDrink}</h2>
      <div data-testid="recipe-category">
        <h3>{detailsDrink.strAlcoholic}</h3>
        <h3>{detailsDrink.strCategory}</h3>
      </div>
      <h4 data-testid="instructions">{detailsDrink.strInstructions}</h4>
      <div id="btns">
        <button type="button" data-testid="share-btn" onClick={ copyBoard }>
          <img src={ buttonShare } alt="img-button-share" />
        </button>
        <button type="button" data-testid="favorite-btn" onClick={ saveFavoriteRecipe }>
          <img
            src={ favoriteButton ? blackHeartIcon : whiteHeartIcon }
            alt="img-button-fav"
          />
        </button>
      </div>
      {arrayIngredients.map((element, index) => (
        <h5
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {element}
        </h5>
      ))}
      <div className="carrossel">
        {recommendDrink.map((drink, index) => (
          <div className="carrossel-iten" key={ index } data-testid={ `${index}-recomendation-card` }>
            <img src={ drink.strMealThumb } alt="drink-thumb" />
            <h3 data-testid={ `${index}-recomendation-title` }>{drink.strMeal}</h3>
          </div>
        ))}
      </div>
      <Link to={ `/bebidas/${props.match.params.id}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn-footer"
        >
          Iniciar receita
        </button>
      </Link>
    </div>
  );
}

DetalhesBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DetalhesBebida;
