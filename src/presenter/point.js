import TripPointItemView from '../view/trip-list-item.js';
import TripPointView from '../view/trip-point.js';
import EditTripPointView from '../view/edit-trip-point.js';
import {render, replaceElements, removeElement} from '../utils/render-DOM-elements.js';
import {UserAction, UpdateType} from '../constants.js';

const pointMode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  constructor(container, changeData, changeMode, newPoint) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._newpoint = newPoint;

    this._parentContainer = new TripPointItemView();

    this._pointComponent = null;
    this._editFormComponent = null;
    this._mode = pointMode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._handlerPointClick = this._handlerPointClick.bind(this);
    this._closeEscape = this._closeEscape.bind(this);
    this._handlerEditForm = this._handlerEditForm.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  initialize (point) {
    this._point = point;
    const prevPoint = this._pointComponent;
    const prevEditForm = this._editFormComponent;

    this._pointComponent = new TripPointView(this._point);
    this._editFormComponent = new EditTripPointView(this._point);

    this._pointComponent.setClickHandler(this._handlerPointClick);
    this._editFormComponent.setHandlerForm(this._handlerEditForm);

    this._pointComponent.setFavoriteHandler(this._handleFavoriteClick);
    this._editFormComponent.setDeleteBtnHandler(this._handleDeleteClick);

    if (prevPoint === null || prevEditForm === null) {
      this._renderPoint();
      return;
    }

    if (this._mode === pointMode.DEFAULT) {
      replaceElements(this._pointComponent, prevPoint);
    }

    if (this._mode === pointMode.EDITING) {
      replaceElements(this._editFormComponent, prevEditForm);
    }

    removeElement(prevPoint);
    removeElement(prevEditForm);
  }

  destroy () {
    removeElement(this._pointComponent);
    removeElement(this._editFormComponent);
    removeElement(this._parentContainer);
  }

  resetView () {
    if (this._mode !== pointMode.DEFAULT) {
      this._swapEditToPoint();
    }
  }

  _swapPointToEdit () {
    replaceElements(this._editFormComponent, this._pointComponent);
    this._changeMode();
    this._mode = pointMode.EDITING;
  }

  _swapEditToPoint () {
    replaceElements(this._pointComponent, this._editFormComponent);
    this._mode = pointMode.DEFAULT;
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_TASK,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }

  _handlerPointClick() {
    this._swapPointToEdit();
    document.addEventListener('keydown',  this._closeEscape);
  }

  _handlerEditForm(point) {
    this._changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      point);
    this._swapEditToPoint();
    document.removeEventListener('keydown',  this._closeEscape);
  }

  _closeEscape (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this._swapEditToPoint();
      document.removeEventListener('keydown', this._closeEscape);
    }
  }

  _renderPoint () {
    render(this._container, this._parentContainer, 'beforeend');
    render(this._parentContainer, this._pointComponent, 'beforeend');
  }

  _handleDeleteClick (point) {
    this._changeData(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      point,
    );
  }
}

