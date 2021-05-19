import AbstractView from './abstract-view.js';

const createPhotosList = (array) => {
  return array.map(({src, description}) => {
    return `<img class="event__photo" src="${src}" alt="${description}">`;}).join('');
};

export default class PhotosListView extends AbstractView{
  constructor(array) {
    super();
    this._array = array;
  }

  getTemplate() {
    return createPhotosList(this._array);
  }
}
