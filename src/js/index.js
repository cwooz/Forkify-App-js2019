// https://www.food2fork.com/api/search
// https://www.food2fork.com/api/get 
// api_key = e7ad8e1dcb4babf119f92615c3d9faf1


import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';

/** 
 * Global State of Application
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
window.state = state;

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
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected search item
    if (state.search) {
      searchView.highlightSelected(id);
    }

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data & parse ingredients
      await state.recipe.getRecipe();
      // console.log(state.recipe.ingredients);
      state.recipe.parseIngredients();

      // Call calcTime & calcServings functions
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      // console.log(state.recipe);
      clearLoader();
      recipeView.renderRecipe(state.recipe);


    } catch (error) {
        alert('Error processing recipe!')
    }
  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


//
// ----------- LIST CONTROLLER --------------------------------------------------------- 
//

const controlList = () => {
  // Create a new list IF there is none yet
  if (!state.list) state.list = new List();

  // Add each ingredient to the list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
}

// 
// ----------- END CONTROLLERS --------------------------------------------------------------------------
// 


// -----------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------

// #1 Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // User 'clicks' DELETE button
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // Delete from state
    state.list.deleteItem(id);

    // Delete from UI
    listView.deleteItem(id);

    // Handle count update
  } else if (e.target.matches('.shopping__count-value')) {
    // Read data from interface
    const val = parseFloat(e.target.value, 10);

    // Update data in state
    state.list.updateCount(id, val);
  }
});


// #2 Handling, USER clicks 'Update' servings
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
      // Decrease button is clicked
      if (state.recipe.servings > 1) {
        state.recipe.updateServings('dec');
        recipeView.updateServingsIngredients(state.recipe);
      }
      
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
      // Increase button is clicked
      state.recipe.updateServings('inc');
      recipeView.updateServingsIngredients(state.recipe);

  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  }
});
// ----------------------------------------------------------------------
