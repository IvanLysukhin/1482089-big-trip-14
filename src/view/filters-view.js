import AbstractView from './abstract-view.js';

const createFilters = (array, currentFilterType) => {
  return array.map((filterType) => {
    const lowerFilterType = filterType.toLowerCase();
    return `<div class="trip-filters__filter">
             <input id="filter-${lowerFilterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${lowerFilterType}" ${currentFilterType === lowerFilterType ? 'checked' : ''}>
             <label class="trip-filters__filter-label" for="filter-${lowerFilterType}">${lowerFilterType}</label>
           </div>`;
  }).join('');
};

const createFilterForm = (array, currentFilterType) => {
  const filters = createFilters(array, currentFilterType);
  return `<form class="trip-filters" action="#" method="get">
              <button class="visually-hidden" type="submit">Accept filter</button>
              ${filters}
          </form>`;
};

export default class FilterFormView extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }
  getTemplate () {
    return createFilterForm(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}
