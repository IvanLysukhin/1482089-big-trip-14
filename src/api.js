import PointsModel from './model/points-model.js';


const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor (endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints () {
    return this._load({url: 'points'})
      .then(Api.toJSON)
      .then((points) => {
        return points.map(PointsModel.adaptToClient);})
      .then((points) => {
        return this.getDestinations(points);
      });
  }

  getDestinations (points) {
    return this._load({url: 'destinations'})
      .then(Api.toJSON)
      .then((destinations) => {
        return destinations.slice().map(PointsModel.adaptBaseDestinationsToClient);})
      .then((destinations) => {
        return this._makeOneObj(destinations);
      })
      .then((destinations) => {
        return points.map((point) => {
          point.citiesDescriptions = destinations;
          return point;});
      })
      .then((points) => {
        return this.getPhotos(points);
      });
  }

  getPhotos (points) {
    return this._load({url: 'destinations'})
      .then(Api.toJSON)
      .then((destinations) => {
        return destinations.slice().map(PointsModel.adaptBasePhotosToClient);})
      .then((destinations) => {
        return this._makeOneObj(destinations);
      })
      .then((photos) => {
        return points.map((point) => {
          point.citiesPhotos = photos;
          return point;});
      })
      .then((points) => {
        return this.getOffers(points);
      });
  }

  getOffers (points) {
    return this._load({url: 'offers'})
      .then(Api.toJSON)
      .then((offers) => {
        return points.map((point) => {
          point.baseOptions = offers;
          return point;});
      })
      .then((points) => {
        return this.getCities(points);
      });
  }

  getCities (points) {
    return this._load({url: 'destinations'})
      .then(Api.toJSON)
      .then((destinations) => {
        return destinations.map((city) => {return city.name;});
      })
      .then((cities) => {
        return points.map((point) => {
          point.destinations = cities;
          return point;});
      });
  }

  _makeOneObj (destinations) {
    let newObj = {};
    destinations.forEach((destination) => {
      newObj = {...newObj, ...destination};
    });
    return newObj;
  }

  updatePoints (point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON);
  }

  _load ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus (response) {
    if (response.status < SuccessHTTPStatusRange.MIN || response.status > SuccessHTTPStatusRange.MAX) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON (response) {
    return response.json();
  }

  static catchError (error) {
    throw error;
  }
}
