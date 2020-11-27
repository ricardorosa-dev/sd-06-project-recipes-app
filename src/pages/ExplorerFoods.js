import React from 'react';
import PropTypes from 'prop-types';
import { fetchRandom } from '../helpers/Helper';

export default function ExplorerFoods(props) {
  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => props.history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => props.history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={
          async () => props.history.push(`/comidas/${await fetchRandom('comida')}`)
        }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

ExplorerFoods.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};