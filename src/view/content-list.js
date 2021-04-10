import {creatElementDOM} from '../utils.js';

const creatContentList = () => {
  return `<ul class="trip-events__list">

          </ul>`;
};

export default class TripPointList {
  constructor() {
    this._element = null;
  }

  getTemplate () {
    return creatContentList();
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
