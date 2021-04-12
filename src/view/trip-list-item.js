import {createElementDOM} from '../utils.js';

const createContentItem = () => {
  return '<li class="trip-events__item"></li>';
};

export default class TripPointItem {
  constructor() {
    this._element = null;
  }

  getTemplate () {
    return createContentItem();
  }

  getElement () {
    if (!this._element) {
      this._element = createElementDOM(this.getTemplate());
    }
    return this._element;
  }

  clearElement() {
    this._element = null;
  }
}
