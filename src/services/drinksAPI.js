const URL_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';

// // type { g=glasses , c=categories, i=ingredients a=alcoholic}
export async function getAllDrinkTypesApi(type) {
  const response = await fetch(`${URL_BASE}list.php?${type}=list`);
  const result = await response.json();
  return result.drinks;
}

// Lista de receitas de bebidas filtradas
export async function getFilteredDrinksApi(type, value) {
  if (type === 'ingredients') {
    const response = await fetch(`${URL_BASE}filter.php?i=${value}`);
    const result = await response.json();
    console.log(result.drinks);
    return result.drinks;
  }
  if (type === 'name') {
    const response = await fetch(`${URL_BASE}search.php?s=${value}`);
    const result = await response.json();
    console.log(result.drinks);
    return result.drinks;
  }
  if (type === 'first') {
    const response = await fetch(`${URL_BASE}search.php?f=${value}`);
    const result = await response.json();
    console.log(result.drinks);
    return result.drinks;
  }
  return [];
}

// Lista de receitas de Bebidas
export async function getRecipeDrinksApi() {
  const response = await fetch(`${URL_BASE}search.php?s=`);
  const result = await response.json();
  return result.drinks;
}

// Lista de receitas de Bebidas por categoria
export async function getRecipeDrinksByCategoryApi(category) {
  const response = await fetch(`${URL_BASE}filter.php?c=${category}`);
  const result = await response.json();
  return result.drinks;
}

// Lista de receitas de Bebidas por ID
export async function getRecipeDrinkByIdApi(id) {
  const response = await fetch(`${URL_BASE}lookup.php?i=${id}`);
  const result = await response.json();
  return result.drinks;
}

export async function getRecipeDrinksByRandom() {
  const response = await fetch(`${URL_BASE}random.php`);
  const result = await response.json();
  return result.drinks;
}

// Lista de Ingredientes de Bebidas
export async function getIngredientsDrinks() {
  const response = await fetch(`${URL_BASE}list.php?i=list`);
  const result = await response.json();
  return result.drinks;
}

export default {
  getAllDrinkTypesApi,
  getRecipeDrinksApi,
  getRecipeDrinksByCategoryApi,
  getRecipeDrinkByIdApi,
  getFilteredDrinksApi,
  getRecipeDrinksByRandom,
  getIngredientsDrinks,
};