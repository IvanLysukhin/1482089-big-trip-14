import MenuPresenter from './menu.js';
import TripPresenter from './trip.js';

export default class App {
  constructor () {
    this._menu = null;
    this._tripList = null;
  }

  initialize (pointsArray) {
    this._pointsArray = pointsArray;
    this._renderMenu(this._pointsArray);
    this._renderTripList(this._pointsArray);
  }

  _renderMenu (pointsArray) {
    this._menu = new MenuPresenter();
    this._menu.initialize(pointsArray);
  }

  _renderTripList (pointsArray) {
    const eventsContainer = document.querySelector('.trip-events');
    this._tripList = new TripPresenter(eventsContainer);
    this._tripList.initialize(pointsArray);
  }
}
