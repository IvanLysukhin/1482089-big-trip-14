import TripListItemView from '../view/trip-list-item-view.js';
import TripPointView from '../view/trip-point-view.js';
import EditTripPointView from '../view/edit-trip-point-view.js';
import {render, replaceElements, removeElement} from '../utils/render-elements.js';
import {UserAction, UpdateType, PointMode, State} from '../constants.js';
import {isOnline, showErrorToast} from '../utils/common';

export default class PointPresenter {
  constructor(container, changeData, changeMode, newPointPresenter) {
    this._container = container;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._newPointPresenter = newPointPresenter;

    this._parentContainer = new TripListItemView();

    this._pointComponent = null;
    this._editFormComponent = null;
    this._mode = PointMode.DEFAULT;

    this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);

    this._pointClickHandler = this._pointClickHandler.bind(this);
    this._escClickHandler = this._escClickHandler.bind(this);
    this._editFormSubmitHandler = this._editFormSubmitHandler.bind(this);
    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
    this._arrowButtonClickHandler = this._arrowButtonClickHandler.bind(this);
  }

  initialize (point) {
    this._point = point;
    const prevPoint = this._pointComponent;
    const prevEditForm = this._editFormComponent;

    this._pointComponent = new TripPointView(this._point);
    this._editFormComponent = new EditTripPointView(this._point);

    this._pointComponent.setPointClickHandler(this._pointClickHandler);
    this._editFormComponent.setFormSubmitHandler(this._editFormSubmitHandler);
    this._editFormComponent.setArrowButtonClickHandler(this._arrowButtonClickHandler);

    this._pointComponent.setFavoriteButtonHandler(this._favoriteButtonClickHandler);
    this._editFormComponent.setDeleteBtnHandler(this._deleteButtonClickHandler);

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

  _favoriteButtonClickHandler() {
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

  _pointClickHandler() {
    if (!isOnline()) {
      showErrorToast('Editing a point is not available in offline');
      return;
    }

    this._swapPointToEdit();
    document.addEventListener('keydown',  this._escClickHandler);
  }

  _editFormSubmitHandler(point) {
    if (!isOnline()) {
      showErrorToast('Editing a point is not available in offline');
      this.setViewState(State.ABORTING);
      return;
    }
    this._changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MAJOR,
      point);
    document.removeEventListener('keydown',  this._escClickHandler);
  }

  _arrowButtonClickHandler () {
    this._swapEditToPoint();
    this._changeData(
      UserAction.RESET_TASK,
      UpdateType.PATCH,
      this._point);
    document.removeEventListener('keydown', this._escClickHandler);
  }

  _escClickHandler (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this._swapEditToPoint();
      this._changeData(
        UserAction.RESET_TASK,
        UpdateType.PATCH,
        this._point);
      document.removeEventListener('keydown', this._escClickHandler);
    }
  }

  _renderPoint () {
    render(this._container, this._parentContainer, 'beforeend');
    render(this._parentContainer, this._pointComponent, 'beforeend');
  }

  _deleteButtonClickHandler (point) {
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
    document.removeEventListener('keydown', this._escClickHandler);
  }
}

