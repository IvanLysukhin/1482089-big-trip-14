import {DATA} from './constants.js';
import {generateTripPoint} from './mock/mocks.js';
import App from './presenter/app.js';
import PointsModel from './model/points.js';

const tripPointsArray = new Array(DATA.COUNT_TRIP_POINTS).fill('').map(generateTripPoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(tripPointsArray);

new App(pointsModel).initialize();
