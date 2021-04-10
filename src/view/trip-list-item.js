import {creatElementDOM} from '../utils.js';

const creatContentItem = () => {
  return '<li class="trip-events__item"></li>';
};

export default class TripPointItem {
  constructor() {
    this._element = null;
  }

  getTemplate () {
    return creatContentItem();
  }

  getElement () {
    if (!this._element) {
      this._element = creatElementDOM(this.getTemplate());
    }
    return this._element;
  }

  clearElement() {
    this._element = null;
  }
}
