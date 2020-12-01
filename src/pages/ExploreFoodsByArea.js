import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';
import { fetchAreas, filterByArea } from '../services';

class ExploreFoodsByArea extends React.Component {
  constructor() {
    super();
    this.state = {
      options: [],
      selectedOption: 'All',
    };
  }

  async componentDidMount() {
    this.resizeH1SearchDiv();
    const areas = await fetchAreas();
    this.setOptionsState(areas);
  }

  async componentDidUpdate() {
    const { selectedOption } = this.state;
    if (selectedOption) {
      if (selectedOption === 'All') {
        const areaFoods = await filterByArea('');
        this.setAreaFoodAndOption(areaFoods);
      } else {
        const areaFoods = await filterByArea(selectedOption);
        this.setAreaFoodAndOption(areaFoods);
      }
    }
  }

  setAreaFoodAndOption(areaFoods) {
    this.setState({
      areaFoods,
      selectedOption: '',
    });
  }

  setOptionsState(options) {
    this.setState({ options });
  }

  setSelectedOption({ target }) {
    this.setState({ selectedOption: target.value });
  }

  resizeH1SearchDiv() {
    const eightHundred = 800;
    if (window.screen.availHeight < eightHundred) {
      const h1 = document.querySelector('.global-h1');
      h1.style.fontSize = '25px';
      const bla = document.querySelector('.search-input-div');
      bla.style.width = '90px';
    }
  }

  redirectOnClick({ idMeal }) {
    const { history } = this.props;
    history.push(`/comidas/${idMeal}`);
  }

  render() {
    const { history } = this.props;
    const { options, areaFoods } = this.state;
    return (
      <div className="explorefoods-container">
        <Header history={ history } />
        {areaFoods
          && (
            <div className="by-area-content">
              <select
                data-testid="explore-by-area-dropdown"
                onChange={ (event) => this.setSelectedOption(event) }
              >
                <option data-testid="All-option">All</option>
                {options.map((element, index) => (
                  <option key={ index } data-testid={ `${element.strArea}-option` }>
                    {element.strArea}
                  </option>
                ))}
              </select>
            </div>
          )}
        <div className="cards-container by-area-container">
          {areaFoods ? areaFoods.map((recipe, index) => (
            <div
              className="card"
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <input
                data-testid={ `${index}-card-img` }
                onClick={ () => this.redirectOnClick(recipe) }
                type="image"
                src={ recipe.strMealThumb }
                alt="recipe-image"
                width="100%"
                style={ { borderRadius: '4px' } }
              />
              <h4 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h4>
            </div>
          )) : (
            <div className="details-loading">
              <div className="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          )}
        </div>
        <Footer history={ history } />
      </div>
    );
  }
}

ExploreFoodsByArea.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(ExploreFoodsByArea);
