import {createElementDOM} from '../utils';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {throw new Error ('Ошибка создания абстрактного класса');}
    this._element = null;
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
}
