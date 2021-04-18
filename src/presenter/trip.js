import {render} from '../utils/render-DOM-elements';

import TripPointListView from '../view/content-list.js';
import EmptyListMessageView from '../view/empty-list-message.js';
import SortListView from '../view/sort';

import TripPointPresenter from '../presenter/point.js';

export default class TripPresenter {
  constructor(listContainer) {
    this._listContainer = listContainer;
    this._eventsList = null;
    this._sortList =  null;
    this._emptyMessage = null;
  }

  initialize(tripPoints) {
    this._eventsList = new TripPointListView();
    this._sortList =  new SortListView();
    this._emptyMessage = new EmptyListMessageView();

    this._tripPoints = tripPoints.slice();
    if (this._tripPoints.length) {
      this._renderEventsList();
      this._renderSortList();
      this._renderTripPoints(this._tripPoints);
    } else {
      this._renderEmptyMessage();
    }
  }

  _renderEventsList () {
    render(this._listContainer, this._eventsList, 'beforeend');
  }

  _renderSortList () {
    render(this._listContainer, this._sortList, 'afterbegin');
  }

  _renderPoint (point) {
    const pointPresenter = new TripPointPresenter(this._eventsList);
    pointPresenter.initialize(point);
  }


  _renderTripPoints (pointsArray) {
    pointsArray.forEach((point) => {this._renderPoint(point);});
  }

  _renderEmptyMessage () {
    render(this._listContainer, this._emptyMessage, 'beforeend');
  }
}
