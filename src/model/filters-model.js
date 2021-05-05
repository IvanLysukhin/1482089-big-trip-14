import Observer from '../observer';
import {FilterType} from '../constants.js';

export default class FiltersModel extends Observer {
  constructor() {
    super();
    this._currentFilter = FilterType.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._currentFilter = filter;

    this._notify(updateType, filter);
  }

  getFilter() {
    return this._currentFilter;
  }
}
