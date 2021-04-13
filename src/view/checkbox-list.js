import AbstractView from './abstract-view.js';

const createCheckboxTypeList = (array) => {
  const typesList = array.map((type) => {
    const lowerType = type.toLowerCase();
    return `<div class="event__type-item">
      <input id="event-type-${lowerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerType}">
      <label class="event__type-label  event__type-label--${lowerType}" for="event-type-${lowerType}-1">${type}</label>
    </div>`;
  }).join('');

  return `<fieldset class="event__type-group">
             <legend class="visually-hidden">Event type</legend>
             ${typesList}
          </fieldset>`;
};


export default class CheckboxTypeList extends AbstractView {
  constructor(array) {
    super();
    this._array = array;
  }

  getTemplate() {
    return createCheckboxTypeList(this._array);
  }
}
