import AbstractView from './abstract-view.js';

const createDestinationsList = (array) => {
  return array.map((destination) => {return `<option value="${destination}"></option>`;}).join('');
};

export default class DestinationsList extends AbstractView {
  constructor(array) {
    super();
    this._array = array;
  }

  getTemplate() {
    return createDestinationsList(this._array);
  }
}
