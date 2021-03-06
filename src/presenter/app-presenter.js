import MenuPresenter from './menu-presenter.js';
import TripPresenter from './trip-presenter.js';
import LoadingView from '../view/loading-view.js';
import {removeElement, render} from '../utils/render-elements.js';
import {UpdateType} from '../constants.js';
import {isOnline, showErrorToast} from '../utils/common.js';

export default class AppPresenter {
  constructor (pointsModel, filterModel, api) {
    this._menu = null;
    this._tripList = null;

    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._api = api;
    this._newEventButtonHandler = this._newEventButtonHandler.bind(this);
    this._renderApp = this._renderApp.bind(this);

    this._isLoading = true;
    this._loadingComponent = new LoadingView();

    this._pointsModel.addObserver(this._renderApp);
  }

  initialize () {
    this._renderApp();
  }

  _getPoints () {
    return this._pointsModel.get();
  }

  _renderApp (updateType) {
    if (updateType === UpdateType.INIT) {
      this._isLoading = false;
      removeElement(this._loadingComponent);
      this._renderTripList(this._getPoints());
      this._renderMenu(this._getPoints());
    }

    if (this._isLoading) {
      this._renderLoading();
    }
  }

  _renderMenu (pointsArray) {
    this._menu = new MenuPresenter(this._pointsModel, this._filterModel, this._tripList);
    this._menu.initialize(pointsArray);
  }

  _renderTripList () {
    const eventsContainer = document.querySelector('.trip-events');
    this._tripList = new TripPresenter(eventsContainer, this._pointsModel, this._filterModel, this._api);
    this._tripList.initialize();
    const addNewPointButton = document.querySelector('.trip-main__event-add-btn');
    addNewPointButton.addEventListener('click', this._newEventButtonHandler);
  }

  _renderLoading() {
    const container = document.querySelector('.trip-events');
    render(container, this._loadingComponent, 'afterbegin');
  }

  _newEventButtonHandler (evt) {
    if (!isOnline()) {
      showErrorToast('Creating a new point is not available in offline');
      return;
    }
    evt.preventDefault();
    this._tripList.createNewPoint(evt.target);
    evt.target.disabled = true;
  }
}
