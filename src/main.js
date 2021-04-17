import {DATA} from './constants.js';
import {render} from './utils/render-DOM-elements.js';
import {generateTripPoint} from './mock/mocks.js';
import SiteMenuView from './view/menu.js';
import FilterFormView from './view/filters.js';
import TripInfoView from './view/trip-info.js';
import TripPriceView from './view/trip-price.js';

import TripPresenter from './presenter/trip.js';

const tripPointsArray = new Array(DATA.COUNT_TRIP_POINTS).fill('').map(generateTripPoint);

// Крупные элементы
const navContainer = document.querySelector('.trip-controls__navigation');
const eventsContainer = document.querySelector('.trip-events');
const mainInfoContainer = document.querySelector('.trip-main');

render(navContainer, new SiteMenuView(), 'beforeend');

render(mainInfoContainer, new TripInfoView(tripPointsArray), 'afterbegin');

const priceContainer = document.querySelector('.trip-info');
render(priceContainer, new TripPriceView(tripPointsArray), 'beforeend');

// Формы фильтров
const filtersContainer = document.querySelector('.trip-controls__filters');
render(filtersContainer, new FilterFormView(DATA.FILTER_TYPES), 'beforeend');

// Точки путешествия
new TripPresenter(eventsContainer).initialize(tripPointsArray);
