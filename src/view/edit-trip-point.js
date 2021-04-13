import {DATA} from '../constants.js';
import AbstractView from './abstract-view.js';
import DestinationsListView from './destinations-list.js';
import CheckboxTypeListView from './checkbox-list.js';
import OfferSelectorsView from './offer-selector.js';

const createEditTripPoint = (obj) => {
  const checkboxTypes = new CheckboxTypeListView(DATA.TRANSPORT_TYPES).getTemplate();
  const {date, destination, pointType, price, options, destinationInfo} = obj;

  const citiesList = new DestinationsListView(destination.cities).getTemplate();

  let hidden = '';
  if (!options.length) {
    hidden = 'visually-hidden';
  }
  const offerList = new OfferSelectorsView(options).getTemplate();

  return `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <!--Чекбоксы выбора транспорта-->
                      ${checkboxTypes}
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${pointType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.city}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${citiesList}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${date.dateStart} ${date.timeStart}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${date.dateEnd} ${date.timeEnd}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers ${hidden}">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                     <!--Выбор опций-->
                     ${offerList}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationInfo.infoText}</p>
                  </section>
                </section>
              </form>`;
};

export default class EditTripPoint extends AbstractView {
  constructor(obj) {
    super();
    this._obj = obj;
    this._closeForm = this._closeForm.bind(this);
  }

  getTemplate() {
    return createEditTripPoint(this._obj);
  }

  _closeForm(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setHandlerForm(cb) {
    this._callback.click = cb;
    this.getElement().addEventListener('submit', this._closeForm);
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeForm);
  }
}
