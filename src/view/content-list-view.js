import AbstractView from './abstract-view.js';

const createContentList = () => {
  return '<ul class="trip-events__list"></ul>';
};

export default class TripPointListView extends AbstractView {
  getTemplate () {
    return createContentList();
  }
}
