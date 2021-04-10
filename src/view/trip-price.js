import {creatElementDOM, sumTripPrice} from '../utils.js';

const creatTripPrice = (array) => {
  const price = sumTripPrice(array);
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
           </p>`;
};

export default class TripPrice {
  constructor(array) {
    this._element = null;
    this._array = array;
  }

  getTemplate() {
    return creatTripPrice(this._array);
  }

  getElement() {
    if (!this._element) {
      this._element = creatElementDOM(this.getTemplate());
    }
    return this._element;
  }

  clearElement() {
    this._element = null;
  }
}
