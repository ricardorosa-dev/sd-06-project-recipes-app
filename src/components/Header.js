import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, fetchApi, showSearchIcon = false } = props;
  const { showSearchBar, setSearchBar, setTypeRecipe } = useContext(ContextRecipes);
  const location = useLocation().pathname;

  const toggleSearchBar = () => {
    if (showSearchBar) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };

  useEffect(() => {
    if (location === '/comidas') {
      setTypeRecipe('food');
    } else {
      setTypeRecipe('drink');
    }
  }, []);

  return (
    <div>
      <Link to="/perfil">
        <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h2 data-testid="page-title">{title}</h2>
      { showSearchIcon
        ? (
          <div>
            <img
              src={ searchIcon }
              alt="Search"
              data-testid="search-top-btn"
              onClick={ toggleSearchBar }
              aria-hidden="true"
            />
          </div>
        ) : <div /> }
      <div>
        {showSearchBar ? <SearchBar fetchApi={ fetchApi } /> : null}
      </div>
    </div>
  );
}

Header.propTypes = {
  fetchApi: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};

export default Header;
