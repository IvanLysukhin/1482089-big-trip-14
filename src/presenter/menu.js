import SiteMenuView from '../view/menu.js';
import TripInfoView from '../view/trip-info.js';
import TripPriceView from '../view/trip-price.js';
import {render} from '../utils/render-DOM-elements.js';
import FilterFormView from '../view/filters.js';
import {DATA} from '../constants.js';

export default class Menu {
  constructor() {
    this._navContainer = document.querySelector('.trip-controls__navigation');
    this._mainInfoContainer = document.querySelector('.trip-main');
    this._filtersContainer = document.querySelector('.trip-controls__filters');

    this._navigation = null;
    this._mainInfo = null;
    this._price = null;
    this._filters = null;
  }

  initialize(array) {
    if (array) {
      this._navigation = new SiteMenuView();
      this._filters = new FilterFormView(DATA.FILTER_TYPES);
      this._renderNav();
      this._renderFilters();
      return;
    }

    this._navigation = new SiteMenuView();
    this._mainInfo = new TripInfoView(array);
    this._price = new TripPriceView(array);
    this._filters = new FilterFormView(DATA.FILTER_TYPES);

    this._renderNav();
    this._renderMainInfo();
    this._renderPrice();
    this._renderFilters();
  }

  _renderNav () {
    render(this._navContainer, this._navigation, 'beforeend');
  }

  _renderMainInfo () {
    render(this._mainInfoContainer , this._mainInfo, 'afterbegin');
  }

  _renderPrice () {
    this._priceContainer = document.querySelector('.trip-info');
    render(this._priceContainer, this._price, 'beforeend');
  }

  _renderFilters () {
    render(this._filtersContainer, this._filters, 'beforeend');
  }
}
