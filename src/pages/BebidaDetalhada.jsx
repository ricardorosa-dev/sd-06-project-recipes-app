import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import fetchDrink from '../servicesAPI/drinkAPI';
import ReceitasContext from '../context/ReceitasContext';

function ComidaDetalhada({ match }) {
  const { setIsFetching, isFetching } = useContext(ReceitasContext);
  const [drink, setDrink] = useState([]);
  const { id } = match.params;

  useEffect(() => {
    setIsFetching(true);
    const firstRequestAPI = async () => {
      const response = await fetchDrink('byId', id);
      setDrink(...response);
      setIsFetching(false);
    };
    firstRequestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="detalhes-container">
      {isFetching
        ? <h2>Loading...</h2>
        : (
          <header className="detalhes-header">
            <img src={ drink.strDrinkThumb } alt="" />
          </header>
        )}
    </div>
  );
}

ComidaDetalhada.propTypes = {
  match: propTypes.shape({
    isExact: propTypes.bool,
    params: propTypes.shape({
      id: propTypes.string,
      path: propTypes.string,
      url: propTypes.string,
    }),
    path: propTypes.string,
    url: propTypes.string,
  }).isRequired,
};

export default ComidaDetalhada;