/* eslint-disable no-alert */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';
import '../style/Header.css';

function Header({ title }) {
  const { data, setData } = useContext(RecipesContext);
  const [searchBar, setSearchBar] = useState(false);
  const [inputRecipe, setInputRecipe] = useState('');
  const [radioValue, setRadioValue] = useState('i');
  const history = useHistory();

  const onlyOne = (recipe) => {
    if (title === 'Comidas') {
      if (recipe.meals.length === 1) {
        setData([recipe, data[1]]);
        return history.push(
          {
            pathname: `/comidas/${recipe.meals[0].idMeal}`,
          },
        );
      }
      return;
    }
    if (recipe.drinks.length === 1) {
      return history.push(
        {
          pathname: `/bebidas/${recipe.drinks[0].idDrink}`,
          state: { recipe: recipe.drinks[0] },
        },
      );
    }
  };

  const searchFood = async () => {
    if (title === 'Comidas') {
      if (radioValue === 'i') {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputRecipe}`);
        const responseJson = await response.json();
        if (responseJson.meals === null) {
          return alert(
            'Sinto muito, não encontramos nenhuma receita para esses filtros.',
          );
        }
        onlyOne(responseJson);
        return setData([responseJson, data[1]]);
      }
      if (radioValue === 'f' && inputRecipe.length !== 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${radioValue}=${inputRecipe}`);
      const responseJson = await response.json();
      if (responseJson.meals === null) {
        return alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
      }
      onlyOne(responseJson);
      return setData([responseJson, data[1]]);
    }

    if (radioValue === 'i') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputRecipe}`);
      const responseJson = await response.json();
      if (responseJson.drinks === null) {
        return alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
      }
      onlyOne(responseJson);
      return setData([data[0], responseJson]);
    }
    if (radioValue === 'f' && inputRecipe.length !== 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?${radioValue}=${inputRecipe}`);
    const responseJson = await response.json();
    if (responseJson.drinks === null) {
      return alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    onlyOne(responseJson);
    return setData([data[0], responseJson]);
  };

  return (
    <header>
      <nav>
        <Link className="profile" to="/perfil">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="Icone de perfil" />
        </Link>
        <h1 data-testid="page-title" className="title">{ title }</h1>
        {
          (title === 'Comidas' || title === 'Explorar Origem' || title === 'Bebidas')
          && (
            <button
              className="searchButton"
              type="button"
              onClick={ () => { setSearchBar(!searchBar); } }
            >
              <img data-testid="search-top-btn" src={ searchIcon } alt="Icone de busca" />
            </button>
          )
        }
      </nav>

      {
        searchBar
        && (
          <div>
            <input
              value={ inputRecipe }
              onChange={ ({ target: { value } }) => { setInputRecipe(value); } }
              data-testid="search-input"
              type="text"
              placeholder="Buscar Receita"
            />
            <label htmlFor="radioIngrediente">
              <input
                data-testid="ingredient-search-radio"
                type="radio"
                id="radioIngrediente"
                name="search"
                onClick={ () => { setRadioValue('i'); } }
              />
              Ingrediente
            </label>
            <label htmlFor="radioNome">
              <input
                type="radio"
                id="radioNome"
                name="search"
                onClick={ () => { setRadioValue('s'); } }
                data-testid="name-search-radio"
              />
              Nome
            </label>
            <label htmlFor="radioLetra">
              <input
                data-testid="first-letter-search-radio"
                type="radio"
                id="radioLetra"
                name="search"
                onClick={ () => { setRadioValue('f'); } }
              />
              Primeira Letra
            </label>
            <button
              data-testid="exec-search-btn"
              onClick={ searchFood }
              type="button"
            >
              Buscar
            </button>
          </div>)
      }
    </header>
  );
}

Header.propTypes = { title: PropTypes.string.isRequired };

export default Header;
