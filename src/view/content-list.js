import {createElementDOM} from '../utils.js';

const createContentList = () => {
  return '<ul class="trip-events__list"></ul>';
};

export default class TripPointList {
  constructor() {
    this._element = null;
  }

  getTemplate () {
    return createContentList();
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
