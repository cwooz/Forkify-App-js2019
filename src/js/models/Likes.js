export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);

    // Persist data in localStorage
    this.persistData();
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);

    // Persist data in localStorage
    this.persistData();
  }

  isLiked(id) {
    // return boolean
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    // Convert Array to String and save to localStorage
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    // Read from localStorage & Parse String back into an Array
    const storage = JSON.parse(localStorage.getItem('likes'));

    // Resotring LIKES from the localStorage
    if (storage) this.likes = storage;
  }
}