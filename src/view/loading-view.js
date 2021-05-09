import AbstractView from './abstract-view.js';
const createLoadingTemplate = () => {
  return '<p class="trip-events__msg">Loading...</p>';
};

export default class LoadingView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createLoadingTemplate();
  }
}
