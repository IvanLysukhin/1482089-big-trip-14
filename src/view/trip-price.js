import {sumTripPrice} from '../utils.js';
import AbstractView from './abstract-view.js';

const createTripPrice = (array) => {
  const price = sumTripPrice(array);
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
           </p>`;
};

export default class TripPrice extends AbstractView {
  constructor(array) {
    super();
    this._array = array;
  }

  getTemplate() {
    return createTripPrice(this._array);
  }
}
