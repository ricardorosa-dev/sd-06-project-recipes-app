import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import likeIcon from '../images/whiteHeartIcon.svg';
import './FoodsDetails.css';

const FoodsDetails = (props) => {
  const { title, setTitle } = useContext(HeaderContext);
  const { recipeObject, recipesDone } = useContext(RecipesContext);
  const { recipeTitle,
    setRecipeTitle,
    recipeImage,
    setRecipeImage,
    recipeCategory,
    setRecipeCategory,
    recipeIngredients,
    setRecipeIngredients,
    recipeInstructions,
    setRecipeInstructions,
    recipeVideo,
    setRecipeVideo,
    recipeRecomendations,
    setRecipeRecomendations,
  } = recipeObject;
  const { match } = props;
  const { params } = match;
  const { id } = params;

  const ingredientsMount = (jsonRecipe) => {
    const initalIndex = 0;
    const halfIndex = 2;
    const ingredients = Object.entries(jsonRecipe.meals[0])
      .filter((item) => item[0].includes('Ingredient') || item[0].includes('Measure'))
      .filter((ar) => ar[1] !== null && ar[1] !== '')
      .map((ar2) => ar2[1]);
    const ingredientsMeasures = [];
    for (let i = initalIndex; i < ingredients.length / halfIndex; i += 1) {
      ingredientsMeasures.push(ingredients[i]
        .concat(' - ', `${ingredients[i + ingredients.length / halfIndex]} `));
    }
    setRecipeIngredients(ingredientsMeasures);
  };

  const videoMount = (jsonRecipe) => {
    const lastIndex = jsonRecipe.meals[0].strYoutube.lastIndexOf('=');
    const videoId = jsonRecipe.meals[0].strYoutube.slice(lastIndex + 1);
    const newVideoPath = `https://www.youtube.com/embed/${videoId}`;
    setRecipeVideo(newVideoPath);
  };

  const fetchRecipe = async () => {
    const path = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getRecipe = await fetch(path);
    const jsonRecipe = await getRecipe.json();
    console.log(jsonRecipe.meals[0]);
    setRecipeTitle(jsonRecipe.meals[0].strMeal);
    setRecipeCategory(jsonRecipe.meals[0].strCategory);
    setRecipeImage(jsonRecipe.meals[0].strMealThumb);
    setRecipeInstructions(jsonRecipe.meals[0].strInstructions);
    videoMount(jsonRecipe);
    ingredientsMount(jsonRecipe);
  };

  const fecthRecomendations = async () => {
    const path = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const getRecipe = await fetch(path);
    const jsonRecipe = await getRecipe.json();
    setRecipeRecomendations([jsonRecipe.drinks[0], jsonRecipe.drinks[1]]);
  };

  const buttonMount = () => {
    if (recipesDone.includes(id)) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    setTitle('Food Details');
    fetchRecipe();
    fecthRecomendations();
  }, []);

  return (
    <div>
      <h1>
        {title}
      </h1>
      <img
        src={ recipeImage }
        alt={ recipeTitle }
        data-testid="recipe-photo"
        className="image-display"
      />
      <div>
        <p data-testid="recipe-title">{recipeTitle}</p>
        <div>
          <img src={ shareIcon } alt="share" data-testid="share-btn" />
          <img src={ likeIcon } alt="like" data-testid="favorite-btn" />
        </div>
      </div>
      <p data-testid="recipe-category">{recipeCategory}</p>

      <ul>
        {recipeIngredients.map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {item}
          </li>
        ))}
      </ul>

      <h3 data-testid="instructions">{recipeInstructions}</h3>

      <iframe src={ recipeVideo } title={ recipeTitle } data-testid="video" />

      <div>
        {recipeRecomendations.map((item, index) => (
          <div
            key={ item.idDrink }
            data-testid={ `${index}-recomendation-card` }
          >
            {item.strDrink}
          </div>
        ))}
      </div>
      {
        buttonMount() && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
          >
            Iniciar Receita
          </button>
        )
      }
    </div>
  );
};

FoodsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodsDetails;