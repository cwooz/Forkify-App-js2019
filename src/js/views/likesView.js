import { elements } from "./base";


export const toggleLikeBtn = (isLiked) => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleLikeMenu = (numLikes) => {
  // change single css style
  elements.likesMenu.style.visiblity = numLikes > 0 ? 'visible' : 'hidden';
}
