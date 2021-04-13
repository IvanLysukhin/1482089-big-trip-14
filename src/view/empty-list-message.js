import {createElementDOM} from '../utils.js';

const creatEmptyListMessage = () => {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
};

export default class EmptyListMessage {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return creatEmptyListMessage();
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
