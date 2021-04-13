import {createElementDOM} from '../utils.js';

const createDestinationsList = (array) => {
  return array.map((destination) => {return `<option value="${destination}"></option>`;}).join('');
};

export default class DestinationsList {
  constructor(array) {
    this._element = null;
    this._array = array;
  }

  getTemplate() {
    return createDestinationsList(this._array);
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
