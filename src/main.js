import {UpdateType} from './constants.js';
import AppPresenter from './presenter/app-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filters-model.js';
import Api from './api/api.js';
import Storage from './api/storage.js';
import Provider from './api/provider.js';
import {isOnline, showDownloadError, showErrorToast} from './utils/common.js';
import {END_POINT, AUTHORIZATION, STORE_PREFIX, STORE_VER} from './constants.js';

const api = new Api(END_POINT, AUTHORIZATION);
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const store = new Storage(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const app = new AppPresenter(pointsModel, filterModel, apiWithProvider);

app.initialize();

apiWithProvider.getPoints().then((points) => {
  pointsModel.set(UpdateType.INIT, points);
})
  .catch(() => {
    document.querySelector('.trip-main__event-add-btn ').disabled = true;
    pointsModel.set(UpdateType.INIT, []);
    showDownloadError();
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('sw.js');
  if (!isOnline()) {
    document.title += ' [offline]';
    showErrorToast('offline mode');
  }
});

window.addEventListener('online', () => {
  showErrorToast('online. all ok');
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  showErrorToast('the network connection was lost. offline mode');
  document.title += ' [offline]';
});
