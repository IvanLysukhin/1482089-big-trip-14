import AbstractView from './abstract-view.js';

const createMenu = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
              <a class="trip-tabs__btn" href="#">Stats</a>
          </nav>`;
};

export default class MenuView extends AbstractView {
  constructor() {
    super();

    this._togglePageClickHandler = this._togglePageClickHandler.bind(this);
  }

  getTemplate () {
    return createMenu();
  }

  setToggleMenuClickHandler (cb) {
    this._callback.togglePageClickHandler = cb;
    this.getElement().addEventListener('click', this._togglePageClickHandler);
  }

  _togglePageClickHandler (evt) {
    if (evt.target.tagName === 'A') {
      evt.preventDefault();
      this._callback.togglePageClickHandler(evt);
    }
  }
}
