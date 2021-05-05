import MenuPresenter from './menu.js';
import TripPresenter from './trip.js';

export default class App {
  constructor (pointsModel) {
    this._menu = null;
    this._tripList = null;

    this._pointsModel = pointsModel;
  }

  initialize () {
    this._renderMenu(this._getPoints());
    this._renderTripList(this._getPoints());
  }

  _getPoints () {
    return this._pointsModel.getPoints();
  }

  _renderMenu (pointsArray) {
    this._menu = new MenuPresenter(this._pointsModel);
    this._menu.initialize(pointsArray);
  }

  _renderTripList () {
    const eventsContainer = document.querySelector('.trip-events');
    this._tripList = new TripPresenter(eventsContainer, this._pointsModel);
    this._tripList.initialize();
  }
}
