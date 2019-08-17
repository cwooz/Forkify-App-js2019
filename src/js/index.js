// https://www.food2fork.com/api/search
// https://www.food2fork.com/api/get 
// api_key = e7ad8e1dcb4babf119f92615c3d9faf1


import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** 
 * Global State of Application
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

//
// ----------- SEARCH CONTROLLER --------------------------------------------------------
//
const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();
  
  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4) Get search Data (search for recipes)
      await state.search.getResults();

      // 5) Render results in UI
      clearLoader();
      searchView.renderResults(state.search.result);

    } catch (error) {
      alert('Something went wrong with the search...');
      clearLoader();
    }
  }
};

// Fire on User Search Submit
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

// Fire on User Click a pagination button
elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  // console.log(e.target);
  // console.log(btn);
    if (btn) {
      const goToPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();
      searchView.renderResults(state.search.result, goToPage);
      // console.log(goToPage);
    }
});


//
// ----------- RECIPE CONTROLLER --------------------------------------------------------- 
//

const controlRecipe = async () => {
  // Get ID from the URL
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if (id) {
    // Prepare UI for changes

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data & parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients;

      // Call calcTime & calcServings functions
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      console.log(state.recipe);

    } catch (error) {
        alert('Error processing recipe!')
    }
  }
};

// -----------------------------------------------------
// window.addEventListener('hashchange', controlRecipe); 
// window.addEventListener('load', controlRecipe);

// *Re-Factor*  Add the same event listener from above to multiple events
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
// -----------------------------------------------------------------------------------

