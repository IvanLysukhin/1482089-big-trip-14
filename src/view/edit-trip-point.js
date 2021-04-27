import {DATA} from '../constants.js';
import AbstractView from './abstract-view.js';
import DestinationsListView from './destinations-list.js';
import CheckboxTypeListView from './checkbox-list.js';
import OfferSelectorsView from './offer-selector.js';
import {findTypeOfferIndex} from '../utils/render-DOM-elements.js';
import {getRandomArray} from '../utils/common.js';

const createEditTripPoint = (obj) => {
  const typesArray = DATA.POINT_TYPES.map((element) => element.type);
  const checkboxTypes = new CheckboxTypeListView(typesArray).getTemplate();
  const {date, city, destinations, pointType, price, hasOptions, hasDestinationInfo, options, infoText} = obj;
  const citiesList = new DestinationsListView(destinations).getTemplate();

  const offerList = new OfferSelectorsView(options, pointType).getTemplate();

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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
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
                ${hasOptions ? `<section class="event__section  event__section--offers ">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                     <!--Выбор опций-->
                     ${offerList}
                    </div>
                  </section>` : ''}
                ${hasDestinationInfo ? `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${infoText}</p>
                  </section>` : ''}
                </section>
              </form>`;
};

export default class EditTripPoint extends AbstractView {
  constructor(obj) {
    super();
    this._data = EditTripPoint.parsePointToData(obj);
    this._closeForm = this._closeForm.bind(this);
    this._checkboxTypeHandler = this._checkboxTypeHandler.bind(this);
    this._cityInputHandler = this._cityInputHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createEditTripPoint(this._data);
  }

  _setInnerHandlers () {
    this.getElement().querySelector('.event__type-group').addEventListener('click', this._checkboxTypeHandler);
    this.getElement().querySelector('#event-destination-1').addEventListener('change', this. _cityInputHandler);
  }

  restoreHandler () {
    this._setInnerHandlers();
    this.setHandlerForm(this._callback.closeFunction);
  }

  _closeForm(evt) {
    evt.preventDefault();
    this._callback.closeFunction(EditTripPoint.parseDataToPoint(this._data));
  }

  setHandlerForm(cb) {
    this._callback.closeFunction = cb;
    this.getElement().addEventListener('submit', this._closeForm);
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeForm);
  }

  static parsePointToData (obj) {
    return Object.assign(
      {},
      obj,
      {
        hasOptions: obj.options.length > 0,
        hasDestinationInfo: obj.destinationInfo.infoText.length > 0,
        infoText: obj.destinationInfo.infoText,
      },
    );
  }

  static parseDataToPoint (data) {
    data = Object.assign({}, data);

    data.destinationInfo.infoText = data.infoText;

    delete data.hasOptions;
    delete data.hasDestinationInfo;
    delete data.infoText;

    return data;
  }

  _checkboxTypeHandler (evt) {
    if (evt.target.classList.contains('event__type-label')) {
      evt.preventDefault();
      const type = evt.target.getAttribute('data-point-type');
      const index = findTypeOfferIndex(type);
      this.updateData({
        pointType: type,
        options: DATA.POINT_TYPES[index].offers,
        hasOptions: DATA.POINT_TYPES[index].offers.length > 0,
      });
    }
  }

  _cityInputHandler (evt) {
    const randomText = getRandomArray(DATA.RANDOM_TEXT.split('. ')).join('. ');
    this.updateData({
      city: evt.target.value,
      infoText: randomText,
      hasDestinationInfo: randomText.length > 0,
    });
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    this.updateElement();
    this.restoreHandler();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.clearElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
  }
}
