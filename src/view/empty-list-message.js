
import AbstractView from './abstract-view.js';

const creatEmptyListMessage = () => {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
};


export default class EmptyListMessage extends AbstractView {
  getTemplate() {
    return creatEmptyListMessage();
  }
}
