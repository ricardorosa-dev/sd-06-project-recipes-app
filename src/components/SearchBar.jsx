import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../context/ReceitasContext';

function SearchBar({ requestAPI }) {
  const { setSearchType, setSearchInput, searchInput } = useContext(ReceitasContext);
  const one = /.{1,}/;

  return (
    <div>
      <nav>
        <input
          onChange={ ({ target }) => setSearchInput(target.value) }
          type="text"
          data-testid="search-input"
        />
        <label htmlFor="ingrediente">
          Ingrediente
          <input
            data-testid="ingredient-search-radio"
            onClick={ () => setSearchType('ingredient') }
            type="radio"
            defaultChecked
            name="radio"
            id="ingrediente"
          />
        </label>
        <label htmlFor="first-letter">
          Primeira letra
          <input
            onClick={ () => setSearchType('firstLetter') }
            data-testid="first-letter-search-radio"
            type="radio"
            name="radio"
            id="first-letter"
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            onClick={ () => setSearchType('itemName') }
            data-testid="name-search-radio"
            type="radio"
            name="radio"
            id="name"
          />
        </label>
        <button
          onClick={ requestAPI }
          type="button"
          data-testid="exec-search-btn"
          disabled={ searchInput < one }
        >
          Buscar
        </button>
      </nav>
    </div>
  );
}

SearchBar.propTypes = {
  requestAPI: propTypes.func.isRequired,
};

export default SearchBar;