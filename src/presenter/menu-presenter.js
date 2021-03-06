import MenuView from '../view/menu-view.js';
import TripInfoView from '../view/trip-info-view.js';
import TripPriceView from '../view/trip-price-view.js';
import {render, removeElement} from '../utils/render-elements.js';
import FiltersPresenter from '../presenter/filters-presenter.js';
import {PageState, UpdateType, FilterType, VISUALLY_HIDDEN} from '../constants.js';
import {getFilter, disableEmptyFilter} from '../utils/filters.js';
import StatsView from '../view/stats-view';

export default class MenuPresenter {
  constructor(pointsModel, filterModel, trip) {
    this._navContainer = document.querySelector('.trip-controls__navigation');
    this._mainInfoContainer = document.querySelector('.trip-main');
    this._filtersContainer = document.querySelector('.trip-controls__filters');

    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._navigation = null;
    this._mainInfo = null;
    this._price = null;
    this._stats = null;
    this._filtersPresenter = new FiltersPresenter(this._filtersContainer, this._filterModel, this._pointsModel);

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._trip = trip;
    this._toggleMenuClickHandler = this._toggleMenuClickHandler.bind(this);
    this._statsContainer = document.querySelector('.page-main').querySelector('.page-body__container');
  }

  initialize() {
    this._renderMenu();
    this._renderStats();
    this._renderNav();
  }

  _getPoints () {
    const points = this._pointsModel.get();
    this._disableFilter(points);
    return getFilter[this._filterModel.get()](this._pointsModel.get().slice());
  }

  _renderMenu () {
    this._renderFilters();
    this._renderMainInfo();
    this._renderPrice();
  }

  _clearMenu () {
    removeElement(this._mainInfo);
    removeElement(this._price);
  }

  _disableFilter (points) {
    if (getFilter[FilterType.EVERYTHING](points).length === 0) {
      disableEmptyFilter(FilterType.EVERYTHING);
    }
    if (getFilter[FilterType.FUTURE](points).length === 0) {
      disableEmptyFilter(FilterType.FUTURE);
    }
    if (getFilter[FilterType.PAST](points).length === 0) {
      disableEmptyFilter(FilterType.PAST);
    }
  }

  _renderNav () {
    this._navigation = new MenuView();
    render(this._navContainer, this._navigation, 'beforeend');
    this._navigation.setToggleMenuClickHandler(this._toggleMenuClickHandler);
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
    this._filtersPresenter.initialize();
  }

  _renderStats () {
    this._stats = new StatsView(this._pointsModel);
    render(this._statsContainer, this._stats, 'beforeend');
  }

  _handleModelEvent (changedMode) {
    switch (changedMode) {
      case UpdateType.MAJOR:
        this._clearMenu();
        removeElement(this._stats);
        this._renderMenu();
        this._renderStats();
        break;

      case UpdateType.MINOR:
        this._clearMenu();
        this._renderMenu();
        break;
    }
  }

  _toggleMenuClickHandler (evt) {
    const newEventBtn = document.querySelector('.trip-main__event-add-btn');
    const filterContainer = document.querySelector('.trip-controls__filters');
    document.querySelectorAll('.trip-tabs__btn').forEach((btn) => {
      if (btn.classList.contains('trip-tabs__btn--active')) {
        btn.classList.remove('trip-tabs__btn--active');
      } else {
        btn.classList.add('trip-tabs__btn--active');
      }
    });
    switch (evt.target.textContent) {
      case PageState.TABLE:
        this._stats.hide();
        this._trip.showTrip();
        newEventBtn.disabled = false;
        filterContainer.classList.remove(VISUALLY_HIDDEN);
        this._filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
        break;
      case PageState.STATS:
        this._stats.show();
        this._trip.hideTrip();
        newEventBtn.disabled = true;
        filterContainer.classList.add(VISUALLY_HIDDEN);
        this._filterModel.set(UpdateType.MINOR, FilterType.EVERYTHING);
        break;
    }
  }
}
