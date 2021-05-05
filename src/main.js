import {DATA} from './constants.js';
import {generateTripPoint} from './mock/mocks.js';
import App from './presenter/app.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filters-model.js';

const tripPointsArray = new Array(DATA.COUNT_TRIP_POINTS).fill('').map(generateTripPoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(tripPointsArray);

const filterModel = new FilterModel();
new App(pointsModel, filterModel).initialize();
