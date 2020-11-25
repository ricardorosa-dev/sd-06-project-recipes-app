import React, { useState, useContext, useEffect } from 'react';
import Context from '../../context/Context';
import { getMealsAPI, getDrinksApi } from '../../services/API';
import './CategoryDisplay.css';

const CategoryDisplay = () => {
  const [categoryes, setCategoryes] = useState([]);
  const { setSelectedCategory } = useContext(Context);

  const { pageTitle } = useContext(Context);

  useEffect(() => {
    if (pageTitle === 'Comidas') {
      getMealsAPI('c=list', 'category').then((data) => {
        setCategoryes(data);
      });
    } else if (pageTitle === 'Bebidas') {
      getDrinksApi('c=list', 'category').then((data) => {
        setCategoryes(data);
      });
    }
  }, [pageTitle]);

  function handleSelectCategory(event) {
    const { target } = event;
    const { value } = target;
    setSelectedCategory(value);
  }

  return (
    <div>
      <table className="category-table">
        <thead>
          <tr>
            {categoryes
              .map(
                (category, index) => {
                  const CATEGORY_NUMBER = 5;
                  while (index < CATEGORY_NUMBER) {
                    return (
                      <th key={ category.strCategory } className="th-category">
                        <button
                          className="category-btn"
                          type="button"
                          value={ category.strCategory }
                          data-testid={ `${category.strCategory}-category-filter` }
                          onClick={ (event) => handleSelectCategory(event) }
                        >
                          {category.strCategory}
                        </button>
                      </th>
                    );
                  }
                  return undefined;
                },
              )}
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default CategoryDisplay;