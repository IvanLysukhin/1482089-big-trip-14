import TripListItemView from '../view/trip-list-item-view.js';
import EditTripPointView from '../view/edit-trip-point-view.js';
import {removeElement, render} from '../utils/render-elements.js';
import {UpdateType, UserAction} from '../constants.js';

export default class NewPointPresenter {
  constructor(container, changeData, button) {
    this._container = container;
    this._changeData = changeData;

    this._editFormComponent = null;
    this._clickedBtn = button;

    this._editFormSubmitHandler = this._editFormSubmitHandler.bind(this);
    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
    this._escClickHandler = this._escClickHandler.bind(this);
    this._arrowButtonClickHandler = this._arrowButtonClickHandler.bind(this);
  }

  initialize (point) {
    if (this._editFormComponent !== null) {
      return;
    }
    this._point = point;

    this._editFormComponent = new EditTripPointView(this._point, true);
    this._editFormComponent.setFormSubmitHandler(this._editFormSubmitHandler);
    this._editFormComponent.setDeleteBtnHandler(this._deleteButtonClickHandler);
    this._editFormComponent.setArrowButtonClickHandler(this._arrowButtonClickHandler);

    this._parentContainer = new TripListItemView();
    render(this._container, this._parentContainer, 'afterbegin');
    render(this._parentContainer, this._editFormComponent, 'afterbegin');

    document.addEventListener('keydown', this._escClickHandler);
  }

  setSaving () {
    this._editFormComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting () {
    const resetState = () => {
      this._editFormComponent.updateData({
        isDisabled: false,
        isSaving: false,
      });
    };

    this._editFormComponent.shake(resetState);
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
    document.removeEventListener('keydown', this._escClickHandler);
  }

  _editFormSubmitHandler(point) {
    this._changeData(
      UserAction.ADD_TASK,
      UpdateType.MAJOR,
      point,
    );
  }

  _deleteButtonClickHandler () {
    this.destroy();
  }

  _arrowButtonClickHandler () {
    this.destroy();
  }

  _escClickHandler (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}

