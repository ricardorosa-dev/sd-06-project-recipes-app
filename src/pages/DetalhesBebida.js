import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
// import copyToClipboard from 'clipboard-copy';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../images';
import '../style/Detalhes.css';

function DetalhesBebida() {
  const { data } = useContext(RecipesContext);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShare, setShare] = useState();
  const history = useHistory();
  const idDrink = history.location.pathname.split('/')[2];
  const SEIS = 6;

  let continuar = false;
  if (localStorage.inProgressRecipes) {
    const ids = Object.keys(JSON.parse(localStorage.inProgressRecipes).cocktails);
    continuar = ids.includes(idDrink);
  }

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
      const responseJson = await response.json();
      setDataDrinks(responseJson.drinks[0]);
      setIsLoading(false);
    }
    fetchAPI();
  }, [idDrink]);

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      setIsFavorite(true);
    }
  }, []);

  // useEffect(() => {
  //   copyToClipboard(`http://localhost:3000/bebidas/${idDrink}`);
  // }, [setShare]);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      localStorage.favoriteRecipes = JSON.stringify([{
        id: dataDrinks.idDrink,
        type: 'bebida',
        area: '',
        category: dataDrinks.strCategory,
        alcoholicOrNot: dataDrinks.strAlcoholic,
        name: dataDrinks.strDrink,
        image: dataDrinks.strDrinkThumb,
      }]);
    } else {
      localStorage.removeItem('favoriteRecipes');
    }
  };

  return (
    <div>
      {(isLoading)
        ? <p>Loading</p>
        : (
          <div className="container-details">
            <img
              data-testid="recipe-photo"
              src={ dataDrinks.strDrinkThumb }
              alt={ dataDrinks.strDrink }
            />
            <h1 data-testid="recipe-title">{ dataDrinks.strDrink }</h1>
            <p data-testid="recipe-category">{ dataDrinks.strAlcoholic }</p>
            <span>
              <button
                data-testid="share-btn"
                type="button"
                onClick={ () => setShare('Link copiado!') }
              >
                <img
                  src={ shareIcon }
                  alt="Botão de Compartilhar"
                />
              </button>
              {isShare}
            </span>
            <button
              data-testid="favorite-btn"
              type="button"
              onClick={ handleClick }
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            >
              <img
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                alt="Botão de Favorito"
              />
            </button>
            <h2>Ingredientes:</h2>
            <ul>
              {
                Object.keys(dataDrinks)
                  .filter((keys) => keys.includes('Ingredient'))
                  .map((ingred, index) => {
                    if (dataDrinks[ingred] !== '' && dataDrinks[ingred] !== null) {
                      const measure = Object.keys(dataDrinks)
                        .filter((keys) => keys.includes('Measure'));
                      const measureIndex = measure[index];
                      return (
                        <li
                          key={ index }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          { `${dataDrinks[ingred]} - ${dataDrinks[measureIndex]} ` }
                        </li>
                      );
                    }
                    return '';
                  })
              }
            </ul>
            <br />
            <h2>Instruções:</h2>
            <p data-testid="instructions">{ dataDrinks.strInstructions }</p>
            <br />

            <h2>Recomendadas</h2>
            {
              data[0] && data[0].meals
                .filter((_, index) => index < SEIS)
                .map(({ strMeal, strMealThumb }, index) => (
                  <div key={ strMeal } data-testid={ `${index}-recomendation-card` }>
                    <img src={ strMealThumb } alt={ strMeal } />
                    <h2 data-testid={ `${index}-recomendation-title` }>{ strMeal }</h2>
                  </div>
                ))
            }
            <Link to={ `/bebidas/${idDrink}/in-progress` }>
              <button
                className="start-recipe"
                data-testid="start-recipe-btn"
                type="button"
              >
                { continuar ? 'Continuar Receita' : 'Iniciar Receita' }
              </button>
            </Link>
          </div>) }
    </div>
  );
}

export default DetalhesBebida;