import TripPointItemView from '../view/trip-list-item.js';
import EditTripPointView from '../view/edit-trip-point.js';
import {removeElement, render} from '../utils/render-DOM-elements.js';
import {UpdateType, UserAction} from '../constants.js';
import {nanoid} from 'nanoid';

export default class NewPoint {
  constructor(container, changeData, button) {
    this._container = container;
    this._changeData = changeData;

    this._editFormComponent = null;
    this._clickedBtn = button;

    this._handlerEditForm = this._handlerEditForm.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._closeEscape = this._closeEscape.bind(this);
  }

  initialize (point) {
    if (this._editFormComponent !== null) {
      return;
    }
    this._point = point;

    this._editFormComponent = new EditTripPointView(this._point, true);
    this._editFormComponent.setHandlerForm(this._handlerEditForm);
    this._editFormComponent.setDeleteBtnHandler(this._handleDeleteClick);

    this._parentContainer = new TripPointItemView();
    render(this._container, this._parentContainer, 'afterbegin');
    render(this._parentContainer, this._editFormComponent, 'afterbegin');

    document.addEventListener('keydown', this._closeEscape);
  }

  destroy () {
    if (this._editFormComponent === null) {
      return;
    }
    removeElement(this._editFormComponent);
    removeElement(this._parentContainer);
    this._editFormComponent = null;
    this._parentContainer = null;
    this._clickedBtn.disabled = !this._clickedBtn.disabled;
    document.removeEventListener('keydown', this._closeEscape);
  }

  _handlerEditForm(point) {
    this._changeData(
      UserAction.ADD_TASK,
      UpdateType.MAJOR,
      Object.assign({id: nanoid()}, point),
    );

    this.destroy();
  }

  _handleDeleteClick () {

    this.destroy();
  }

  _closeEscape (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}

