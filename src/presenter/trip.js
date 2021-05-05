import {render, removeElement} from '../utils/render-DOM-elements';
import {updateItem, sortTime, sortPrice} from '../utils/common.js';
import {DATA} from '../constants.js';
import {UserAction, UpdateType} from '../constants.js';

import TripPointListView from '../view/content-list.js';
import EmptyListMessageView from '../view/empty-list-message.js';
import SortListView from '../view/sort';

import TripPointPresenter from '../presenter/point.js';

export default class TripPresenter {
  constructor(listContainer, pointsModel) {
    this._pointsModel = pointsModel;

    this._listContainer = listContainer;
    this._eventsList = null;
    this._sortList =  null;
    this._emptyMessage = null;

    this._pointPresenter = {};
    this._currentSortType = DATA.SORT_TYPE.DEFAULT;

    this._handleTripPointChange = this._handleTripPointChange.bind(this);
    this._handleChangeMode = this._handleChangeMode.bind(this);
    this._handleSort = this._handleSort.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  initialize() {
    this._renderTrip();
  }

  _renderTrip () {
    const points = this._getPoints().slice();
    if (points.length <= 0) {
      this._renderEmptyMessage();
      return;
    }
    this._renderEventsList();
    this._renderSortList();
    this._renderTripPoints(points);
  }

  _handleViewAction (actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent (updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].initialize(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip(true);
        this._renderTrip();
        break;
    }
  }

  _getPoints () {
    switch (this._currentSortType) {
      case DATA.SORT_TYPE.TIME:
        return this._pointsModel.getPoints().slice().sort(sortTime);
      case DATA.SORT_TYPE.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortPrice);
    }
    return this._pointsModel.getPoints();
  }

  _renderEventsList () {
    this._eventsList = new TripPointListView();
    render(this._listContainer, this._eventsList, 'beforeend');
  }

  _renderSortList () {
    if (this._sortList !== null) {
      this._sortList =  null;
    }
    this._sortList =  new SortListView(this._currentSortType);
    render(this._listContainer, this._sortList, 'afterbegin');
    this._sortList.setSortClick(this._handleSort);
  }
  _handleSort (sortType) {
    if (this._currentSortType !== sortType.target.getAttribute('for')) {
      this._currentSortType = sortType.target.getAttribute('for');
      this._clearTrip();
      this._renderTrip();
    }
  }

  _renderPoint (point) {
    const pointPresenter = new TripPointPresenter(this._eventsList, this._handleViewAction, this._handleChangeMode);
    pointPresenter.initialize(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderTripPoints (pointsArray) {
    pointsArray.forEach((point) => {this._renderPoint(point);});
  }

  _clearTrip (resetSortType = false) {
    Object.values(this._pointPresenter).forEach((pointPresenter) => {pointPresenter.destroy();});
    this._pointPresenter = {};

    removeElement(this._sortList);
    removeElement(this._emptyMessage);
    this._sortList = null;
    this._emptyMessage = null;
    if (resetSortType) {
      this._currentSortType = DATA.SORT_TYPE.DEFAULT;
    }
  }

  _handleTripPointChange (updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._sourcedTripPoints = updateItem(this._sourcedTripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].initialize(updatedPoint);
  }

  _renderEmptyMessage () {
    this._emptyMessage = new EmptyListMessageView();
    render(this._listContainer, this._emptyMessage, 'beforeend');
  }

  _handleChangeMode () {
    Object
      .values(this._pointPresenter)
      .forEach((pointPresenter) =>{pointPresenter.resetView();});
  }
}
