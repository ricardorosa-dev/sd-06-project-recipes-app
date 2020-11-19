const baseURL = 'https://www.thecocktaildb.com/api/json/v1';

const NAME_KEY = 'search.php?s'; // search bar
const FIRST_LETTER_KEY = 'search.php?f'; // search bar
const FILTER_INGREDIENTS_KEY = 'filter.php?i='; // search bar

// const ID_KEY = 'lookup.php?i';
// const INGREDIENTS_KEY = 'i';
// const AREA_KEY = 'f';

// const CATEGORIES_KEY_VALUE = 'list.php?c=list';
// const AREA_KEY_VALUE = 'list.php?a=list';
// const INGREDIENTS_KEY_VALUE = 'list.php?i=list';

export const searchOptions = {
  name: NAME_KEY,
  first_letter: FIRST_LETTER_KEY,
  ingredients: FILTER_INGREDIENTS_KEY,
};

export async function fetchDrinksSearch({ option, value, token }) {
  const searchKey = searchOptions[option];
  const urlToFetch = `${baseURL}/${token}/${searchKey}=${value}`;

  const data = await fetch(urlToFetch);
  const { drinks } = await data.json();

  return drinks;
}
