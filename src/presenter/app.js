import MenuPresenter from './menu.js';
import TripPresenter from './trip.js';
import StatsView from '../view/stats-view.js';
import {render} from '../utils/render-DOM-elements.js';

export default class App {
  constructor (pointsModel, filterModel) {
    this._menu = null;
    this._tripList = null;
    this._stats = null;

    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._creatNewPoint = this._creatNewPoint.bind(this);
  }

  initialize () {
    this._renderTripList(this._getPoints());
    this._renderStats();
    this._renderMenu(this._getPoints());
  }

  _getPoints () {
    return this._pointsModel.getPoints();
  }

  _renderMenu (pointsArray) {
    this._menu = new MenuPresenter(this._pointsModel, this._filterModel, this._stats, this._tripList);
    this._menu.initialize(pointsArray);
  }

  _renderTripList () {
    const eventsContainer = document.querySelector('.trip-events');
    this._tripList = new TripPresenter(eventsContainer, this._pointsModel, this._filterModel);
    this._tripList.initialize();
    const addNewPointButton = document.querySelector('.trip-main__event-add-btn');
    addNewPointButton.addEventListener('click', this._creatNewPoint);
  }

  _creatNewPoint (evt) {
    evt.preventDefault();
    this._tripList.createNewPoint(evt.target);
    evt.target.disabled = true;
  }

  _renderStats () {
    const statsContainer = document.querySelector('.page-main').querySelector('.page-body__container');
    this._stats = new StatsView();
    render(statsContainer, this._stats, 'beforeend');
  }
}
