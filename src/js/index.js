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
// ----------- SEARCH CONTROLLER -------------------------------------- 
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

    // 4) Search for recipes
    await state.search.getResults();

    // 5) Render results in UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

// Fire on User Search Submit
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

// Fire on User Click a 'search results' pagination button
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
// ----------- RECIPE CONTROLLER -------------------------------------- 
//
const r = new Recipe(46956);
r.getRecipe();
console.log(r);