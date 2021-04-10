import {DATA} from './constants.js';
import {render} from './utils.js';
import {generateTripPoint} from './mock/mocks.js';
import SiteMenuView from './view/menu.js';
import SortListView from './view/sort.js';
import TripPointListView from './view/content-list.js';
import TripPointItemView from './view/trip-list-item.js';
import FilterFormView from './view/filters.js';
import TripPointView from './view/trip-point.js';
import TripInfoView from './view/trip-info.js';
import TripPriceView from './view/trip-price.js';
import EditTripPointView from './view/edit-trip-point.js';

const tripPointsArray = new Array(DATA.COUNT_TRIP_POINTS).fill('').map(generateTripPoint);

// Крупные элементы
const navContainer = document.querySelector('.trip-controls__navigation');
const eventsContainer = document.querySelector('.trip-events');
const mainInfoContainer = document.querySelector('.trip-main');

render(navContainer, new SiteMenuView().getElement(), 'beforeend');
render(eventsContainer, new SortListView().getElement(), 'beforeend');

render(mainInfoContainer, new TripInfoView(tripPointsArray).getElement(), 'afterbegin');

const priceContainer = document.querySelector('.trip-info');
render(priceContainer, new TripPriceView(tripPointsArray).getElement(), 'beforeend');

// Формы фильтров
const filtersContainer = document.querySelector('.trip-controls__filters');
render(filtersContainer, new FilterFormView(DATA.FILTER_TYPES).getElement(), 'beforeend');

// Точки путешествия
const eventsList = new TripPointListView();
render(eventsContainer, eventsList.getElement(), 'beforeend');

const renderTripPoint = (point) => {
  const parentContainer = new TripPointItemView();
  const tripPoint = new TripPointView(point);
  const editFrom = new EditTripPointView(point);

  render(eventsList.getElement(), parentContainer.getElement(), 'beforeend');
  render(parentContainer.getElement(), tripPoint.getElement(), 'beforeend');

  const swapPointToEdit = () => {
    parentContainer.getElement().replaceChild(editFrom.getElement(), tripPoint.getElement());
  };

  const swapEditToPoint = () => {
    parentContainer.getElement().replaceChild(tripPoint.getElement(), editFrom.getElement());
  };

  tripPoint.getElement().querySelector('.event__rollup-btn').addEventListener('click', swapPointToEdit);
  editFrom.getElement().querySelector('.event__save-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    swapEditToPoint();
  });
  editFrom.getElement().querySelector('.event__rollup-btn').addEventListener('click', swapEditToPoint);
};

for (const point of tripPointsArray) {
  renderTripPoint(point);
}
