import AbstractView from './abstract-view.js';

const createContentItem = () => {
  return '<li class="trip-events__item"></li>';
};

export default class TripPointItemView extends AbstractView {
  getTemplate () {
    return createContentItem();
  }
}
