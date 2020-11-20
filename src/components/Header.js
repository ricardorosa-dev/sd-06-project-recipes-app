import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import perfil from '../images/profileIcon.svg';
import busca from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const [search, setSearch] = useState(false);

  return (
    <div>
      <div>
        <Link to="/">
          <img
            src={ perfil }
            alt="perfil"
            data-testid="profile-top-btn"
          />
        </Link>
      </div>
      <div>
        <span data-testid="page-title">{ document.title }</span>
      </div>
      <div>
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ () => { setSearch(!search); } }
        >
          <img
            src={ busca }
            alt="busca"
          />
        </button>
      </div>
      {(search) ? <SearchBar /> : '' }
    </div>
  );
}
