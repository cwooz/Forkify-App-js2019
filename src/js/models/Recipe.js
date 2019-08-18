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
    const unitsLong = ['tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'ounces', 'ounce', 'pounds', 'cup'];
    const unitsShort = ['tbsp', 'tbsp', 'tsp', 'tsp', 'oz', 'oz', 'pound', 'cup'];

    const newIngredients = this.ingredients.map(el => {
      // 1) Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2) Remove parentheses w/ Regex: https://stackoverflow.com/questions/4292468/javascript-regex-remove-text-between-parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3) Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        // Case #1: There is a unit
        // Example: 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") = 4.5
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

          objIng = {
            count,
            unit: arrIng[unitIndex],
            ingredient: arrIng.slice(unitIndex + 1).join(' ')
          }
        
      } else if (parseInt(arrIng[0], 10)) {
        // Case #2: There is NO unit, but the 1st element is a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredients: arrIng.slice(1).join(' ')
        }

      } else if (unitIndex === -1) {
        // Case #3: There is No unit and No number in the 1st position
        objIng = {
            count: 1,
            unit: '',
            ingredient
        }
      }

      return objIng;
    });

    this.ingredients = newIngredients;
  }
}