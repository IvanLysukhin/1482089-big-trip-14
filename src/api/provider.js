import PointsModel from '../model/points-model.js';
import {isOnline} from '../utils/common.js';
import dayjs from 'dayjs';

const getSyncedPoints = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points);
          this._store.setItems(items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems());

    return Promise.resolve(storePoints);
  }

  updatePoint(point) {
    if (isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setItem(updatedPoint.id, updatedPoint);
          return updatedPoint;
        });
    }

    this._store.setItem(point.id, Object.assign({}, point));

    return Promise.resolve(point);
  }

  addNewPoint(point) {
    if (isOnline()) {
      return this._api.addNewPoint(point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, newPoint);
          return newPoint;
        });
    }

    return Promise.reject(new Error('Add point failed'));
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removeItem(point.id));
    }

    return Promise.reject(new Error('Delete point failed'));
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems()).map((point) => {
        if (!point._date) {return;}
        point._date.startTime = dayjs(point._date.startTime);
        point._date.endTime = dayjs(point._date.endTime);
        return PointsModel.adaptToServer(point);
      });
      return this._api.sync(storePoints)
        .then((response) => {

          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
