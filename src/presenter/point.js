import TripPointItemView from '../view/trip-list-item.js';
import TripPointView from '../view/trip-point.js';
import EditTripPointView from '../view/edit-trip-point.js';
import {render, replaceElements, removeElement} from '../utils/render-DOM-elements.js';

export default class PointPresenter {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;

    this._parentContainer = new TripPointItemView();

    this._pointComponent = null;
    this._editFormComponent = null;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._handlerPointClick = this._handlerPointClick.bind(this);
    this._closeEscape = this._closeEscape.bind(this);
    this._handlerEditForm = this._handlerEditForm.bind(this);
  }

  initialize (point) {
    this._point = point;
    const prevPoint = this._pointComponent;
    const prevEditForm = this._editFormComponent;

    this._pointComponent = new TripPointView(point);
    this._editFormComponent = new EditTripPointView(point);

    this._pointComponent.setClickHandler(this._handlerPointClick);
    this._editFormComponent.setHandlerForm(this._handlerEditForm);

    this._pointComponent.setFavoriteHandler(this._handleFavoriteClick);

    if (prevPoint === null || prevEditForm === null) {
      this._renderPoint();
      return;
    }

    if (this._parentContainer.getElement().contains(prevPoint.getElement())) {
      replaceElements(this._pointComponent, prevPoint);
    }

    if (this._parentContainer.getElement().contains(prevEditForm.getElement())) {
      replaceElements(this._editFormComponent, prevEditForm);
    }

    removeElement(prevPoint);
    removeElement(prevEditForm);
  }

  destroy () {
    removeElement(this._pointComponent);
    removeElement(this._editFormComponent);
  }

  _swapPointToEdit () {
    replaceElements(this._editFormComponent, this._pointComponent);
  }

  _swapEditToPoint () {
    replaceElements(this._pointComponent, this._editFormComponent);
  }

  _handleFavoriteClick() {
    this._changeData(
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

  _handlerEditForm() {
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
}

