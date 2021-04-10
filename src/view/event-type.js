import {creatElementDOM} from '../utils.js';

const creatItems = (array) => {

  const typesList = array.map((_, i) => {
    const lowerType = array[i].toLowerCase();
    return `<div class="event__type-item">
      <input id="event-type-${lowerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerType}">
      <label class="event__type-label  event__type-label--${lowerType}" for="event-type-${lowerType}-1">${array[i]}</label>
    </div>`;
  }).join('');

  return `<fieldset class="event__type-group">
             <legend class="visually-hidden">Event type</legend>
             ${typesList}
          </fieldset>`;
};


export default class TripPointType {
  constructor(array) {
    this._element = null;
    this._array = array;
  }

  getTemplate() {
    return creatItems(this._array);
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
