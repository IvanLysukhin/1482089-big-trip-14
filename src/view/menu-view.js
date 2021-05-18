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

    this._togglePage = this._togglePage.bind(this);
  }

  getTemplate () {
    return createMenu();
  }

  setToggleMenuClick (cb) {
    this._callback.togglePage = cb;
    this.getElement().addEventListener('click', this._togglePage);
  }

  _togglePage (evt) {
    if (evt.target.tagName === 'A') {
      evt.preventDefault();
      this._callback.togglePage(evt);
    }
  }
}
