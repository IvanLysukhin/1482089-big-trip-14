import {createElementDOM} from '../utils';

const createPhotosList = (array) => {
  return array.map((url) => {return `<img class="event__photo" src="${url}" alt="Event photo">`;}).join('');
};

export default class PhotosList {
  constructor(array) {
    this._element = null;
    this._array = array;
  }

  getTemplate() {
    return createPhotosList(this._array);
  }

  getElement() {
    if (!this._element) {
      this._element = createElementDOM(this.getTemplate());
    }
    return this._element;
  }

  clearElement() {
    this._element = null;
  }
}
