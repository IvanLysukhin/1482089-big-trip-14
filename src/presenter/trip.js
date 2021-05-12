import {render, removeElement, showHideElement} from '../utils/render-DOM-elements';
import {updateItem, sortTime, sortPrice, sortDate, getRandomArrayElement} from '../utils/common.js';
import {DATA, UserAction, UpdateType, FilterType, State} from '../constants.js';
import TripPointListView from '../view/content-list.js';
import EmptyListMessageView from '../view/empty-list-message.js';
import EmptyFilter from '../view/empty-filter.js';
import SortListView from '../view/sort';
import TripPointPresenter from '../presenter/point.js';
import {getFilter} from '../utils/filters.js';
import NewTripPoint from '../presenter/new-point.js';
import {nanoid} from 'nanoid';

export default class TripPresenter {
  constructor(listContainer, pointsModel, filterModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._api = api;

    this._listContainer = listContainer;
    this._eventsList = new TripPointListView();
    this._sortList =  null;
    this._emptyMessage = null;
    this._emptyFilter = null;

    this._pointPresenter = {};
    this._currentSortType = DATA.SORT_TYPE.DEFAULT;

    this._handleTripPointChange = this._handleTripPointChange.bind(this);
    this._handleChangeMode = this._handleChangeMode.bind(this);
    this._handleSort = this._handleSort.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
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
        this._pointPresenter[update.id].setViewState(State.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(State.ABORTING);
          });
        break;
      case UserAction.ADD_TASK:
        this._newPointPresenter.setSaving();
        this._api.addNewPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
            this._newPointPresenter.destroy();
          })
          .catch(() => {
            this._newPointPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_TASK:
        this._pointPresenter[update.id].setViewState(State.DELETING);
        this._api.deletePoint(update).then(() => {
          this._pointsModel.deletePoint(updateType, update);
        })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(State.ABORTING);
          });
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
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints().slice();
    const filterPoints = getFilter[filterType](points);

    if (!filterPoints.length) {
      this._emptyFilter = new EmptyFilter();
      render(this._listContainer, this._emptyFilter, 'beforeend');
    }


    switch (this._currentSortType) {
      case DATA.SORT_TYPE.TIME:
        return filterPoints.sort(sortTime);
      case DATA.SORT_TYPE.PRICE:
        return filterPoints.sort(sortPrice);
    }
    return filterPoints.sort(sortDate);
  }

  _renderEventsList () {
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
    const pointPresenter = new TripPointPresenter(this._eventsList, this._handleViewAction, this._handleChangeMode, this._newPointPresenter);
    pointPresenter.initialize(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderTripPoints (pointsArray) {
    pointsArray.forEach((point) => {this._renderPoint(point);});
  }

  _clearTrip (resetSortType = false) {
    Object.values(this._pointPresenter).forEach((pointPresenter) => {pointPresenter.destroy();});
    this._pointPresenter = {};
    removeElement(this._emptyFilter);
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

  createNewPoint (evt) {
    const defaultsRandomPoint = getRandomArrayElement(this._pointsModel.getPoints().slice());
    defaultsRandomPoint.id = nanoid(3);
    this._newPointPresenter =  new NewTripPoint(this._eventsList, this._handleViewAction, evt);
    this._currentSortType = DATA.SORT_TYPE.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newPointPresenter.initialize(defaultsRandomPoint);
  }

  showTrip () {
    showHideElement(false, this._listContainer);
  }

  hideTrip () {
    showHideElement(true, this._listContainer);
  }
}
