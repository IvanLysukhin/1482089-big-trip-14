import {UpdateType} from './constants.js';
import App from './presenter/app.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filters-model.js';
import Api from './api.js';


const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const app = new App(pointsModel, filterModel);

app.initialize();

const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic ivanlysukhin270695';
const api = new Api(END_POINT, AUTHORIZATION);

api.getPoints().then((points) => {
  pointsModel.setPoints(UpdateType.INIT, points);
});
