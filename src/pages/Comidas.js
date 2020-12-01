import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MealsCard from '../components/MealsCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ReceitasContext from '../context/ReceitasContext';
import FoodFilters from '../components/FoodFilters';
import { foodAPI, foodCategoryApi } from '../services/foodAPI';
import logo from '../images/myfood.png';
import '../style/Loading.css';

const Comidas = (history) => {
  const { searchBox, meals, setMeals, setFiltersData } = useContext(ReceitasContext);

  const location = useLocation();
  const doze = 12;

  useEffect(() => {
    async function fetchFood() {
      const data = await foodCategoryApi();
      const responseFoodsAPI = await foodAPI();

      setFiltersData(data);
      setMeals(responseFoodsAPI);
    }

    fetchFood();
  }, []);

  return !meals.length ? (
    <div className="container align-self-center d-flex justify-content-center">
      <img src={ logo } alt="teste" className="loading col" />
    </div>
  ) : (
    <section>
      <Header title="Comidas" searchBtn />
      {searchBox && <SearchBar history={ history } />}
      <div className="my-4 py-2">
        <FoodFilters />
        <div className="row my-5 mx-3">
          {meals.length && meals
            .filter((x, index) => index < doze)
            .map((food, i) => <MealsCard key={ i } food={ food } index={ i } />)}
        </div>
      </div>
      {location.pathname === '/comidas' && <Footer />}
    </section>
  );
};

export default Comidas;
