import {createElementDOM, showHideElement} from '../utils/render-elements.js';
import {SHAKE_TIMEOUT} from '../constants.js';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {throw new Error ('Ошибка создания абстрактного класса');}
    this._element = null;
    this._callback = {};
  }
  getTemplate() {
    throw new Error('Необходимо опредлить функция создания шаблона элемента');
  }

  getElement() {
    if (!this._element) {
      this._element = createElementDOM(this.getTemplate());
    }
    return this._element;
  }

  clearElement() {
    this._element = null;
  }

  show () {
    showHideElement(false, this.getElement());
  }

  hide () {
    showHideElement(true, this.getElement());
  }

  shake (cb) {
    this.getElement().style.animation = `shake ${SHAKE_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = '';
      cb();
    }, SHAKE_TIMEOUT);
  }
}
