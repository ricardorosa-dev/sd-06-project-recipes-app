import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import DrinkCard from '../components/MealsCard';
import ReceitasContext from '../context/ReceitasContext';

function Bebidas() {
  const { searchBox } = useContext(ReceitasContext);
  const location = useLocation();

  return (
    <section>
      <Header title="Bebidas" searchBtn />
      {searchBox && <SearchBar />}
      <DrinkCard />
      {location.pathname === '/bebidas' ? <Footer /> : null}

    </section>
  );
}

export default Bebidas;
