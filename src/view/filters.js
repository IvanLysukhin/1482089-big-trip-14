import {creatElementDOM} from '../utils.js';

const creatFilters = (array) => {
  return array.map((_, i) => {
    return `<div class="trip-filters__filter">
             <input id="filter-${array[i]}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${array[i]}">
             <label class="trip-filters__filter-label" for="filter-${array[i]}">${array[i]}</label>
           </div>`;
  }).join('');
};

const creatFilterForm = (array) => {
  const filters = creatFilters(array);
  return `<form class="trip-filters" action="#" method="get">
              <button class="visually-hidden" type="submit">Accept filter</button>
              ${filters}
          </form>`;
};

export default class FilterForm {
  constructor(array) {
    this._element = null;
    this._array = array;
  }
  getTemplate () {
    return creatFilterForm(this._array);
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
