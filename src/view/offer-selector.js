import AbstractView from './abstract-view.js';
import {DATA} from '../constants.js';
import {findTypeOfferIndex} from '../utils/render-DOM-elements.js';

const createOfferSelector = (array, type) => {
  return array.map((offer, i) => {
    const {text,  price, isChecked} = offer;
    return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type.toLowerCase()}-${i+1}" type="checkbox" name="event-offer-${type.toLowerCase()}" ${isChecked ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${type.toLowerCase()}-${i+1}">
              <span class="event__offer-title">${text}</span>
                          &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`;
  }).join('');
};

export default class OfferSelectors extends AbstractView {
  constructor(array, type) {
    super();
    this._array = array;
    this._type = type;
  }

  getTemplate() {
    const index = findTypeOfferIndex(this._type);
    if (index !== -1) {
      this._array = DATA.POINT_TYPES[index].offers;
    }
    return createOfferSelector(this._array, this._type);
  }
}
