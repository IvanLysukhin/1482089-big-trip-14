import Observer from '../observer.js';
import dayjs from 'dayjs';

export default class PointsModel extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints (points) {
    this._points = points.slice();
  }

  getPoints () {
    return this._points;
  }

  updatePoint (updateType, update) {
    const index = this._points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points =[
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint (updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }

  deletePoint (updateType, update) {
    const index = this._points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient (point) {
    const adaptedPoint = Object.assign({},
      point,
      {
        price: point.base_price,
        _date: Object.assign({},{
          startTime: dayjs(point.date_from),
          endTime: dayjs(point.date_to),
        }),
        pointType: point.type,
        city:point.destination.name,
        destinationInfo: Object.assign({}, {
          infoText: point.destination.description,
          photos: point.destination.pictures.map((pic) => {return pic.src;}),
        }),
        isFavorite: point.is_favorite,
        options: point.offers.map((offer) => {
          offer.isChecked = true;
          return offer;
        }),
      });

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.type;
    delete adaptedPoint.destination;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.offers;

    return adaptedPoint;
  }

  static adaptBaseDestinationsToClient (point) {
    point[point.name] = point.description;
    const BaseDestinations = Object.assign({},
      point,
    );

    delete BaseDestinations.name;
    delete BaseDestinations.description;
    delete BaseDestinations.pictures;

    return BaseDestinations;
  }

  static adaptBasePhotosToClient (point) {
    point[point.name] = point.pictures;
    const BaseDestinations = Object.assign({},
      point,
    );

    delete BaseDestinations.name;
    delete BaseDestinations.description;
    delete BaseDestinations.pictures;

    return BaseDestinations;
  }
}
