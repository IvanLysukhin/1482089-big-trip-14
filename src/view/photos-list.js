import AbstractView from './abstract-view.js';

const createPhotosList = (array) => {
  return array.map((url) => {return `<img class="event__photo" src="${url}" alt="Event photo">`;}).join('');
};

export default class PhotosList extends AbstractView{
  constructor(array) {
    super();
    this._array = array;
  }

  getTemplate() {
    return createPhotosList(this._array);
  }
}
