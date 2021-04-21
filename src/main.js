import {DATA} from './constants.js';
import {generateTripPoint} from './mock/mocks.js';
import App from './presenter/app.js';

const tripPointsArray = new Array(DATA.COUNT_TRIP_POINTS).fill('').map(generateTripPoint);

new App().initialize(tripPointsArray);
