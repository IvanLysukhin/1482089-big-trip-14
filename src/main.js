import {DATA} from './constants.js';
import {render} from './utils.js';
import {generateTripPoint} from './mock/mocks.js';
import SiteMenuView from './view/menu.js';
import SortListView from './view/sort.js';
import TripPointListView from './view/content-list.js';
import FilterFormView from './view/filters.js';
import TripPointView from './view/trip-point.js';
import TripInfoView from './view/trip-info.js';
import TripPriceView from './view/trip-price.js';
import NewTripPointView from './view/new-trip-point.js';
import EditTripPointView from './view/edit-trip-point.js';
import TripPointTypeListView from './view/event-type.js';

const tripPointsArray = new Array(DATA.COUNT_TRIP_POINTS).fill('').map(generateTripPoint);

// Крупные элементы
render('.trip-controls__navigation','beforeend',  new SiteMenuView().getElement());
render('.trip-events','beforeend',  new SortListView().getElement());
render('.trip-events','beforeend',  new TripPointListView().getElement());

render('.trip-main', 'afterbegin', new TripInfoView(tripPointsArray).getElement());
render('.trip-info', 'beforeend', new TripPriceView(tripPointsArray).getElement());

// Формы фильтров
render('.trip-controls__filters','beforeend',  new FilterFormView(DATA.FILTER_TYPES).getElement());

// Точки путешествия
for (const point of tripPointsArray) {
  render('.trip-events__list', 'beforeend', new TripPointView(point).getElement());
}

// Функция создания формы создания или редактирования точки путешествия
const renderTripPointForm = (formType) => {
  let renderFunction = new NewTripPointView(tripPointsArray[0]).getElement();
  if (formType === 'edit') {
    renderFunction = new EditTripPointView(tripPointsArray[0]).getElement();
  }
  render('.trip-events__list', 'afterbegin', renderFunction);

  render('.event__type-list', 'beforeend', new TripPointTypeListView(DATA.TRANSPORT_TYPES).getElement());

};

renderTripPointForm();
renderTripPointForm('edit');

