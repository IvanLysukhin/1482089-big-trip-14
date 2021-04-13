import AbstractView from './abstract-view.js';

const createFilters = (array) => {
  return array.map((filterType) => {
    return `<div class="trip-filters__filter">
             <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}">
             <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
           </div>`;
  }).join('');
};

const createFilterForm = (array) => {
  const filters = createFilters(array);
  return `<form class="trip-filters" action="#" method="get">
              <button class="visually-hidden" type="submit">Accept filter</button>
              ${filters}
          </form>`;
};

export default class FilterForm extends AbstractView {
  constructor(array) {
    super();
    this._array = array;
  }
  getTemplate () {
    return createFilterForm(this._array);
  }
}
