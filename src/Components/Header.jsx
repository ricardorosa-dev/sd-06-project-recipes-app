import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../Style/Header.css';

function Header({ pageName }) {
  const [divShow, setDivShow] = useState('hide');

  function handleClick() {
    const divShearBar = document.querySelector('#shearBar');

    if (divShearBar.className === 'hide') {
      setDivShow('show');
      const creatInput = document.createElement('input');
      creatInput.className = 'search-input';
      const attributes = document.createAttribute('data-testid');
      attributes.value = 'search-input';
      creatInput.setAttributeNode(attributes);
      divShearBar.appendChild(creatInput);
    } else {
      setDivShow('hide');
      const removeInput = document.querySelector('.search-input');
      divShearBar.removeChild(removeInput);
    }
  }

  return (
    <div>
      <div className="header">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="Profile Icon Button"
          />
        </Link>
        <p data-testid="page-title">{pageName}</p>
        { (pageName !== 'Receitas Feitas' && pageName !== 'Receitas Favoritas'
        && pageName !== 'Explorar' && pageName !== 'Explorar Comidas'
        && pageName !== 'Explorar Bebidas' && pageName !== 'Explorar Ingredientes'
        && pageName !== 'Perfil')
          ? (
            <button className="button-search" type="button" onClick={ handleClick }>
              <img
                src={ searchIcon }
                data-testid="search-top-btn"
                alt="Search Icon Button"
              />
            </button>
          ) : null}
      </div>
      <div id="shearBar" className={ divShow } />

    </div>
  );
}

Header.propTypes = {
  pageName: PropTypes.string,
}.isRequired;

export default Header;
