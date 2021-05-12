import AbstractView from './abstract-view.js';

const creatEmptyFilterMessage = () => {
  return '<p class="trip-events__msg trip-events__msg--empty-filter">Filter is empty</p>';
};

export default class EmptyFilter extends AbstractView {
  getTemplate() {
    return creatEmptyFilterMessage();
  }
}
