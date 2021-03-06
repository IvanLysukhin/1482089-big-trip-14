import FiltersView from '../view/filters-view.js';
import {removeElement, render, replaceElements} from '../utils/render-elements';
import {FILTER_TYPES, UpdateType} from '../constants.js';

export default class FiltersPresenter {
  constructor (filterContainer, filterModel, pointsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;

    this._filterComponent = null;

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  initialize () {
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FiltersView(FILTER_TYPES, this._filterModel.get());
    this._filterComponent.setFilterTypeChangeHandler(this._filterChangeHandler);

    if (!prevFilterComponent) {
      render(this._filterContainer,this._filterComponent, 'beforeend');
      return;
    }

    replaceElements(this._filterComponent, prevFilterComponent);
    removeElement(prevFilterComponent);
  }

  _handleModelEvent() {
    this.initialize();
  }

  _filterChangeHandler(filterType) {
    if (this._filterModel.get() === filterType) {
      return;
    }

    this._filterModel.set(UpdateType.MAJOR, filterType);
  }
}
