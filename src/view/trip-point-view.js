import AbstractView from './abstract-view.js';
import {findDuration} from '../utils/common.js';

const createOfferItem = (array) => {
  return array.map(({title, price, isChecked}) => {
    if (isChecked) {
      return `<li class="event__offer">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>`;}
  }).join('');
};

const createTripPoint = ({city, pointType, price, isFavorite, options, _date}) => {

  const duration = findDuration(_date.endTime.diff(_date.startTime, 'minute'));

  const offerItems = createOfferItem(options);
  let favoriteButtonClass = '';

  if (isFavorite) {
    favoriteButtonClass = 'event__favorite-btn--active';
  }

  return `<div class="event">
                <time class="event__date" datetime="${_date.startTime.format('YYYY-MM-DDTHH:mm')}">${_date.startTime.format('D MMM')}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType.toLowerCase()}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${pointType} ${city}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${_date.startTime.format('YYYY-MM-DDTHH:mm')}">${_date.startTime.format('HH:mm')}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${_date.endTime.format('YYYY-MM-DDTHH:mm')}">${_date.endTime.format('HH:mm')}</time>
                  </p>
                  <p class="event__duration">${duration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offerItems}
                </ul>
                <button class="event__favorite-btn ${favoriteButtonClass}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>`;
};


export default class TripPointView extends AbstractView {
  constructor(obj) {
    super();
    this._obj = obj;
    this._arrowUpClickHandler = this._arrowUpClickHandler.bind(this);
    this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createTripPoint(this._obj);
  }

  setPointClickHandler(cb) {
    this._callback._arrowUpClickHandler = cb;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._arrowUpClickHandler);
  }

  setFavoriteButtonHandler (cb) {
    this._callback.favoriteButtonClickHandler = cb;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteButtonClickHandler);
  }

  _arrowUpClickHandler(evt) {
    evt.preventDefault();
    this._callback._arrowUpClickHandler();
  }

  _favoriteButtonClickHandler (evt) {
    evt.preventDefault();
    this._callback.favoriteButtonClickHandler();
  }
}
