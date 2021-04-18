import {DATA} from './constants.js';
import {generateTripPoint} from './mock/mocks.js';
import TripPresenter from './presenter/trip.js';
import MenuPresenter from './presenter/menu.js';

const tripPointsArray = new Array(DATA.COUNT_TRIP_POINTS).fill('').map(generateTripPoint);

new MenuPresenter().initialize(tripPointsArray);

// Точки путешествия
const eventsContainer = document.querySelector('.trip-events');
new TripPresenter(eventsContainer).initialize(tripPointsArray);
