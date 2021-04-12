import {createElementDOM} from '../utils.js';

const createMenu = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
              <a class="trip-tabs__btn" href="#">Stats</a>
          </nav>`;
};

export default class SiteMenu {
  constructor() {
    this._element = null;
  }

  getTemplate () {
    return createMenu();
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
