import SiteMenuView from '../view/menu.js';
import TripInfoView from '../view/trip-info.js';
import TripPriceView from '../view/trip-price.js';
import {render, removeElement} from '../utils/render-DOM-elements.js';
import FiltersPresenter from '../presenter/filters-presenter.js';
import {PAGE_CONDITION, UpdateType, FilterType} from '../constants.js';
import {getFilter} from '../utils/filters.js';

export default class Menu {
  constructor(pointsModel, filterModel, stats, trip) {
    this._navContainer = document.querySelector('.trip-controls__navigation');
    this._mainInfoContainer = document.querySelector('.trip-main');
    this._filtersContainer = document.querySelector('.trip-controls__filters');

    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._navigation = null;
    this._mainInfo = null;
    this._price = null;
    this.filtersPresenter = new FiltersPresenter(this._filtersContainer, this._filterModel, this._pointsModel);

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._stats = stats;
    this._trip = trip;
    this._toggleMenu = this._toggleMenu.bind(this);
  }

  initialize() {
    this._renderMenu();
  }

  _handleModelEvent (changedMode) {
    if (changedMode !== UpdateType.PATCH) {
      this._clearMenu();
      this._renderMenu();
    }
  }

  _clearMenu () {
    removeElement(this._navigation);
    removeElement(this._mainInfo);
    removeElement(this._price);
  }

  _renderMenu () {
    this._renderNav();
    this._renderFilters();
    this._renderMainInfo();
    this._renderPrice();
  }

  _getPoints () {
    return getFilter[this._filterModel.getFilter()](this._pointsModel.getPoints().slice());
  }

  _renderNav () {
    this._navigation = new SiteMenuView();
    render(this._navContainer, this._navigation, 'beforeend');
    this._navigation.setToggleMenuClick(this._toggleMenu);
  }

  _toggleMenu (evt) {
    switch (evt.target.textContent) {
      case PAGE_CONDITION.TABLE:
        this._stats.hide();
        this._trip.showTrip();
        break;
      case PAGE_CONDITION.STATS:
        this._stats.show();
        this._trip.hideTrip();
        this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
        break;
    }
  }

  _renderMainInfo () {
    this._mainInfo = new TripInfoView(this._getPoints());
    render(this._mainInfoContainer , this._mainInfo, 'afterbegin');
  }

  _renderPrice () {
    this._price = new TripPriceView(this._getPoints());
    this._priceContainer = document.querySelector('.trip-info');
    render(this._priceContainer, this._price, 'beforeend');
  }

  _renderFilters () {
    this.filtersPresenter.initialize();
  }
}
