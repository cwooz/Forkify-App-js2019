// // Global app controller
// import string from "./models/Search";
// // import { add, mult, ID } from "./views/searchView";
// import * as searchView from "./views/searchView";

// console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.mult(searchView.ID, 3)}`);



// https://www.food2fork.com/api/search
// https://www.food2fork.com/api/get 
// e7ad8e1dcb4babf119f92615c3d9faf1

import axios from 'axios';

async function getResults(query) {
  // fix for CORS error (cross-browser call)
  const proxy = 'https://crossorigin.me/';
  const key = 'e7ad8e1dcb4babf119f92615c3d9faf1';

  try {
    // axios over 'fetch' call for wider browser compatibility and 1 step process
    // AJAX call w/ Axios, returns promise in json format
    const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
    const recipes = res.data.recipes;
    
    console.log(recipes);
    
  } catch (error) {
    console.log(error);
  }

}

getResults('pizza');