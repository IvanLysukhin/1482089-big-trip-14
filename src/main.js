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
import EmptyListMessageView from './view/empty-list-message.js';

const tripPointsArray = new Array(DATA.COUNT_TRIP_POINTS).fill('').map(generateTripPoint);

// Крупные элементы
const navContainer = document.querySelector('.trip-controls__navigation');
const eventsContainer = document.querySelector('.trip-events');
const mainInfoContainer = document.querySelector('.trip-main');

render(navContainer, new SiteMenuView().getElement(), 'beforeend');

render(mainInfoContainer, new TripInfoView(tripPointsArray).getElement(), 'afterbegin');

const priceContainer = document.querySelector('.trip-info');
render(priceContainer, new TripPriceView(tripPointsArray).getElement(), 'beforeend');

// Формы фильтров
const filtersContainer = document.querySelector('.trip-controls__filters');
render(filtersContainer, new FilterFormView(DATA.FILTER_TYPES).getElement(), 'beforeend');

// Точки путешествия
const eventsList = new TripPointListView();

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

  const closeEscape = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      swapEditToPoint();
      document.removeEventListener('keydown', closeEscape);
    }
  };

  tripPoint.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    swapPointToEdit();
    document.addEventListener('keydown',  closeEscape);
  });
  editFrom.getElement().querySelector('.event__save-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    swapEditToPoint();
    document.removeEventListener('keydown', closeEscape);
  });
  editFrom.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    swapEditToPoint();
    document.removeEventListener('keydown', closeEscape);
  });
};

const renderContent = (array) => {
  if (array.length) {
    render(eventsContainer, eventsList.getElement(), 'beforeend');
    render(eventsContainer, new SortListView().getElement(), 'afterbegin');

    for (const point of array) {
      renderTripPoint(point);
    }
  } else {
    render(eventsContainer, new EmptyListMessageView().getElement(), 'beforeend');
  }
};

renderContent(tripPointsArray);
