import TripPointItemView from '../view/trip-list-item.js';
import TripPointView from '../view/trip-point.js';
import EditTripPointView from '../view/edit-trip-point.js';
import {render} from '../utils/render-DOM-elements.js';

export default class PointPresenter {
  constructor(container) {
    this._container = container;

    this._parentContainer = new TripPointItemView();

    this._pointComponent = null;
    this._editFormComponent = null;

    this._handlerPointClick = this._handlerPointClick.bind(this);
    this._closeEscape = this._closeEscape.bind(this);
    this._handlerEditForm = this._handlerEditForm.bind(this);
  }

  initialize (point) {
    this._renderPoint(point);
    this._pointComponent.setClickHandler(this._handlerPointClick);
    this._editFormComponent.setHandlerForm(this._handlerEditForm);
  }

  _swapPointToEdit () {
    this._parentContainer.getElement().replaceChild(this._editFormComponent.getElement(), this._pointComponent.getElement());
  }

  _swapEditToPoint () {
    this._parentContainer.getElement().replaceChild(this._pointComponent.getElement(), this._editFormComponent.getElement());
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

  _renderPoint (point) {
    this._pointComponent = new TripPointView(point);
    this._editFormComponent = new EditTripPointView(point);

    render(this._container, this._parentContainer, 'beforeend');
    render(this._parentContainer, this._pointComponent, 'beforeend');
  }
}

