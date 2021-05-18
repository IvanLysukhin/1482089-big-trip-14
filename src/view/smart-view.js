import Abstract from './abstract-view.js';

export default class SmartView extends Abstract {
  constructor () {
    super();
    this._data = {};
  }

  updateData (update) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    this.updateElement();
    this.restoreHandlers();
  }

  updateElement () {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.clearElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
  }

  restoreHandlers () {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
