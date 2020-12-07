import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Recommended from '../components/Recommended';
import { fetchRecipe } from '../services/api';
import handleFavorite from '../services/storageFunctions';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DrinkDetails() {
  const [recipe, setRecipe] = useState({ recipe: { } });
  const [isFetching, setIsFetching] = useState(true);
  const [isFavorite, setIsFavorite] = useState(whiteHeartIcon);
  const [copied, setCopied] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const sliceNumber = 9;
  const itemId = useLocation().pathname.slice(sliceNumber);
  const itemUrl = useLocation().pathname;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemId}`;

  function favoriteStatus(id) {
    let favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipes === null) favRecipes = [];
    const favorited = favRecipes.find((item) => (item.id === id));
    if (favorited) {
      setIsFavorite(blackHeartIcon);
    } else {
      setIsFavorite(whiteHeartIcon);
    }
  }

  function checkIfDone(id) {
    let doneRecipesArray = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesArray === null) doneRecipesArray = [];
    const done = doneRecipesArray.find((item) => (item.id === id));
    if (done) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  }

  useEffect(() => {
    (async () => {
      const recipeObj = await fetchRecipe(url);
      setRecipe(recipeObj.drinks);
      setIsFetching(false);
    })();
    favoriteStatus(itemId);
    checkIfDone(itemId);
  }, []);

  // lógica dessa função adaptada de https://stackoverflow.com/questions/49580528/
  function ingredientsFunc(recipeData) {
    const ingredientsArray = [];
    let index = 1;
    const max = 15;
    for (index; index <= max; index += 1) {
      if (recipeData[`strIngredient${index}`] !== null
        && recipeData[`strIngredient${index}`] !== '') {
        ingredientsArray.push({
          ingredient: recipeData[`strIngredient${index}`],
          quantity: recipeData[`strMeasure${index}`],
        });
      }
    }
    return ingredientsArray;
  }

  const data = (isFetching) ? [{}] : recipe;
  const { strDrink,
    strCategory,
    strInstructions,
    strDrinkThumb,
    strAlcoholic } = data[0];
  const ingredients = ingredientsFunc(data[0]);

  const favoriteObj = {
    id: itemId,
    type: 'bebida',
    category: strCategory,
    area: '',
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  function handleFavoriteClick() {
    handleFavorite(favoriteObj);
    favoriteStatus(itemId);
  }

  function handleShareClick() {
    clipboardCopy(`http://localhost:3000${itemUrl}`);
    const seconds = 5000;
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, seconds);
  }

  return (
    <div className="food-container">
      <Header title="Detalhes" />
      {(isFetching) ? <div>Loading recipe...</div>
        : (
          <div className="mobile-container">
            <header className="recipe-head">
              <div>
                <h1
                  className="recipe-title"
                  data-testid="recipe-title"
                >
                  {strDrink}
                </h1>
              </div>
              <div>
                <h3
                  className="recipe-category"
                  data-testid="recipe-category"
                >
                  {strAlcoholic}
                </h3>
              </div>
            </header>
              <img
                data-testid="recipe-photo"
                className="recipe-img"
                src={ strDrinkThumb }
                alt={ `${strDrink}` }
              />
            <div className="action-btns-div">
              <button
                className="share-btn"
                type="button"
                data-testid="share-btn"
                onClick={ handleShareClick }
              >
                <img src={ shareIcon } alt="Compartilhar" />
                Compartilhar
              </button>
              {(copied) && <div className="copied-span">Link copiado!</div>}
              <button
                className="fav-btn"
                type="button"
                onClick={ handleFavoriteClick }
              >
                <img
                  className="share-icon"
                  data-testid="favorite-btn"
                  src={ isFavorite }
                  alt="Favoritar"
                />
                Favoritar
              </button>
            </div>
            <div className="ingredients-list">
              {ingredients.map((ingredient, index) => (
                <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
                  {`${ingredient.ingredient} - ${(ingredient.quantity === null)
                    ? 'a pinch'
                    : ingredient.quantity}`}
                </p>
              ))}
            </div>
            <p className="recipe-instructions" data-testid="instructions">
              {strInstructions}
            </p>
            <Recommended />
            <div className="btn-div">
              {(!isDone) && (
                <Link to={ `${itemUrl}/in-progress` }>
                  <button
                    type="button"
                    className="start-recipe-btn"
                    data-testid="start-recipe-btn"
                  >
                    Iniciar Receita
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      <Footer />
    </div>
  );
}

export default DrinkDetails;
