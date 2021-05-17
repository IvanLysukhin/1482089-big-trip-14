import TripPointItemView from '../view/trip-list-item.js';
import TripPointView from '../view/trip-point.js';
import EditTripPointView from '../view/edit-trip-point.js';
import {render, replaceElements, removeElement} from '../utils/render-elements.js';
import {UserAction, UpdateType, PointMode, State} from '../constants.js';
import {isOnline, showErrorToast} from '../utils/common';

export default class PointPresenter {
  constructor(container, changeData, changeMode, newPointPresenter) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._newPointPresenter = newPointPresenter;

    this._parentContainer = new TripPointItemView();

    this._pointComponent = null;
    this._editFormComponent = null;
    this._mode = PointMode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._handlerPointClick = this._handlerPointClick.bind(this);
    this._closeEscape = this._closeEscape.bind(this);
    this._handlerEditForm = this._handlerEditForm.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._wrapForm = this._wrapForm.bind(this);
  }

  initialize (point) {
    this._point = point;
    const prevPoint = this._pointComponent;
    const prevEditForm = this._editFormComponent;

    this._pointComponent = new TripPointView(this._point);
    this._editFormComponent = new EditTripPointView(this._point);

    this._pointComponent.setClickHandler(this._handlerPointClick);
    this._editFormComponent.setHandlerForm(this._handlerEditForm);
    this._editFormComponent.setArrowButton(this._wrapForm);

    this._pointComponent.setFavoriteHandler(this._handleFavoriteClick);
    this._editFormComponent.setDeleteBtnHandler(this._handleDeleteClick);

    if (prevPoint === null || prevEditForm === null) {
      this._renderPoint();
      return;
    }

    if (this._mode === PointMode.DEFAULT) {
      replaceElements(this._pointComponent, prevPoint);
    }

    if (this._mode === PointMode.EDITING) {
      replaceElements(this._pointComponent, prevEditForm);
      this._mode = PointMode.DEFAULT;
    }

    removeElement(prevPoint);
    removeElement(prevEditForm);
  }

  setViewState(state) {
    const resetState = () => {
      this._editFormComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._editFormComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._editFormComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING :
        this._pointComponent.shake(resetState);
        this._editFormComponent.shake(resetState);
        break;
    }
  }

  destroy () {
    removeElement(this._pointComponent);
    removeElement(this._editFormComponent);
    removeElement(this._parentContainer);
  }

  resetView () {
    if (this._mode !== PointMode.DEFAULT) {
      this._swapEditToPoint();
    }
  }

  _swapPointToEdit () {
    if (this._newPointPresenter !== null) {
      this._newPointPresenter.destroy();
    }
    replaceElements(this._editFormComponent, this._pointComponent);
    this._changeMode();
    this._mode = PointMode.EDITING;
  }

  _swapEditToPoint () {
    replaceElements(this._pointComponent, this._editFormComponent);
    this._mode = PointMode.DEFAULT;
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
    if (!isOnline()) {
      showErrorToast('Editing a point is not available in offline');
      return;
    }

    this._swapPointToEdit();
    document.addEventListener('keydown',  this._closeEscape);
  }

  _handlerEditForm(point) {
    if (!isOnline()) {
      showErrorToast('Editing a point is not available in offline');
      this.setViewState(State.ABORTING);
      return;
    }
    this._changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MAJOR,
      point);
    document.removeEventListener('keydown',  this._closeEscape);
  }

  _wrapForm () {
    this._swapEditToPoint();
    this._changeData(
      UserAction.RESET_TASK,
      UpdateType.PATCH,
      this._point);
    document.removeEventListener('keydown', this._closeEscape);
  }

  _closeEscape (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this._swapEditToPoint();
      this._changeData(
        UserAction.RESET_TASK,
        UpdateType.PATCH,
        this._point);
      document.removeEventListener('keydown', this._closeEscape);
    }
  }

  _renderPoint () {
    render(this._container, this._parentContainer, 'beforeend');
    render(this._parentContainer, this._pointComponent, 'beforeend');
  }

  _handleDeleteClick (point) {
    if (!isOnline()) {
      this.setViewState(State.ABORTING);
      showErrorToast('Delete a point is not available in offline');
      return;
    }
    this._changeData(
      UserAction.DELETE_TASK,
      UpdateType.MAJOR,
      point,
    );
  }
}

