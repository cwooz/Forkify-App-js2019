import axios from 'axios';
import { key, url } from '../config';


export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
        const res = await axios(`${url}get?key=${key}&rId=${this.id}`);
        this.title = res.data.recipe.title;
        this.author = res.data.recipe.publisher;
        this.img = res.data.recipe.image_url;
        this.url = res.data.recipe.source_url;
        this.ingredients = res.data.recipe.ingredients;
        // console.log(res);
    } catch (error) {
        console.log(error);
        alert('Something went wrong :(');
    }
  }

  calcTime() {
    // Assuming that we need 15min per 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    // Simple solution: each recipe has 4 servings
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoon', 'tablespoons', 'teaspoon', 'teaspoons', 'ounce', 'ounces', 'pound', 'pounds', 'cup'];
    const unitsShort = ['tbsp', 'tbsp', 'tsp', 'tsp', 'oz', 'oz', 'lbs', 'lbs', 'cup'];

    const newIngredients = this.ingredients.map(el => {
      // 1) Uniform units
      let ingredient = el.toLowerCase();

      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2) Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, '');

      // 3) Parse ingredients into count, unit and ingredient
      return ingredient;

    });

    this.ingredients = newIngredients;
  }
}