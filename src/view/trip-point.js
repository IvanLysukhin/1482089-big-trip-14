import AbstractView from './abstract-view.js';

const findDuration = (diff) => {
  const daysInMinutes = Math.floor(diff / 1440);
  const hoursInMinutes = Math.floor((diff  % 1440)/60);

  let days = `${daysInMinutes}D`;

  let hour = `${hoursInMinutes}H`;

  let minutes =`${(diff  % 1440)%60}M`;

  if (daysInMinutes < 1) {
    days = '';
  }

  if (hoursInMinutes < 1) {
    hour = '';
  }

  if (minutes < 1) {
    minutes = '';
  }

  return `${days} ${hour} ${minutes}`;
};


const createOfferItem = (array) => {
  return array.map((offer) => {
    const {text, price, isChecked} = offer;
    if (isChecked) {
      return `<li class="event__offer">
            <span class="event__offer-title">${text}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>`;}
  }).join('');
};

const createTripPoint = (obj) => {
  const {city, pointType, price, isFavorite, options, _date} = obj;

  const duration = findDuration(_date.endTime.diff(_date.startTime, 'minute'));

  const offerItems = createOfferItem(options);
  let favoriteButtonClass = '';

  if (isFavorite) {
    favoriteButtonClass = 'event__favorite-btn--active';
  }

  return `<div class="event">
                <time class="event__date" datetime="${_date.startTime.format('YYYY-MM-DDTHH:mm')}">${_date.startTime.format('D MMM')}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType}.png" alt="Event type icon">
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


export default class TripPoint extends AbstractView {
  constructor(obj) {
    super();
    this._obj = obj;
    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClick = this._favoriteClick.bind(this);
  }

  getTemplate() {
    return createTripPoint(this._obj);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.closeFunction();
  }

  setClickHandler(cb) {
    this._callback.closeFunction = cb;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._clickHandler);
  }

  _favoriteClick (evt) {
    evt.preventDefault();
    this._callback.faboriteBtnClick();
  }

  setFavoriteHandler (cb) {
    this._callback.faboriteBtnClick = cb;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClick);
  }
}
