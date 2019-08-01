// https://www.food2fork.com/api/search
// https://www.food2fork.com/api/get 
// e7ad8e1dcb4babf119f92615c3d9faf1


import Search from "./models/Search";

/** 
 * Global State of Application
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {}

const controlSearch = async () => {
  // 1) Get query from view
  const query = 'pizza';  // TODO!
  
  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results

    // 4) Search for recipes
    await state.search.getResults();

    // 5) Render results in UI
    console.log(state.search.result);
  }
}

document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

