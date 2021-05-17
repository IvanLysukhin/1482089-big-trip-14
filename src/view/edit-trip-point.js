import {TRANSPORT_TYPES, TimeInput} from '../constants.js';
import DestinationsListView from './destinations-list.js';
import CheckboxTypeListView from './checkbox-list.js';
import OfferSelectorsView from './offer-selector.js';
import {isOnline, showErrorMassage} from '../utils/common.js';
import Smart from './smart-view.js';
import PhotosListView from './photos-list.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';
import he from 'he';

const createEditTripPoint = ({_date,
  city,
  destinations,
  pointType,
  price,
  defaultOptions,
  hasOptions,
  hasDestinationInfo,
  infoText,
  photos,
  isDisabled,
  isSaving,
  isDeleting}, isNewPoint = false) => {

  if (!isOnline()) {
    _date.startTime = dayjs(_date.startTime);
    _date.endTime = dayjs(_date.endTime);
  }

  const checkboxTypes = new CheckboxTypeListView(TRANSPORT_TYPES).getTemplate();

  const citiesList = new DestinationsListView(destinations).getTemplate();
  const offerList = new OfferSelectorsView(pointType, defaultOptions).getTemplate();
  const photosList = new PhotosListView(photos).getTemplate();
  return `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

                    <div class="event__type-list">
                      <!--Чекбоксы выбора транспорта-->
                      ${checkboxTypes}
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${pointType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(city)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
                    <datalist id="destination-list-1">
                      ${citiesList}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" data-time="${_date.startTime.toISOString()}" value="${_date.startTime.format('DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" data-time="${_date.endTime.toISOString()}" value="${_date.endTime.format('DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}" min="1" ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isNewPoint ? 'Cancel' : `${isDeleting ? 'Deleting...' : 'Delete'}`}</button>
                  <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
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
                ${photos.length ? `
                ${isNewPoint ? `<div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photosList}
                      </div>` : ''}
                      ` : ''}
                </section>
              </form>`;
};

export default class EditTripPoint extends Smart {
  constructor(obj, isNewPoint) {
    super();
    this._isNewPoint = isNewPoint;
    this._datepickerStart = null;
    this._datepickerEnd = null;
    this._data = EditTripPoint.parsePointToData(obj);
    this._closeForm = this._closeForm.bind(this);
    this._checkboxTypeHandler = this._checkboxTypeHandler.bind(this);
    this._cityInputHandler = this._cityInputHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._destroyStartDatePicker = this._destroyStartDatePicker.bind(this);
    this._destroyEndDatePicker = this._destroyEndDatePicker.bind(this);
    this._deletePointByClick = this._deletePointByClick.bind(this);
    this._wrapForm = this._wrapForm.bind(this);

    this._checkTimeValidity = this._checkTimeValidity.bind(this);
    this._setPicker = this._setPicker.bind(this);

    this._setInnerHandlers();
    this._setValidity();

    this._setTimeInputDatePicker();
  }

  getTemplate() {
    return createEditTripPoint(this._data, this._isNewPoint);
  }

  _setInnerHandlers () {
    this.getElement().querySelector('.event__type-group').addEventListener('click', this._checkboxTypeHandler);
    this.getElement().querySelector('#event-destination-1').addEventListener('change', this. _cityInputHandler);
  }

  restoreHandlers () {
    this._setInnerHandlers();
    this.setHandlerForm(this._callback.closeFunction);
    this.setArrowButton(this._callback.closeArrowButton);

    this._setValidity();

    this.setDeleteBtnHandler(this._callback.deleteClick);
    this._setTimeInputDatePicker();
  }

  _closeForm(evt) {
    evt.preventDefault();

    this._handleCheckedOptions();

    this.updateData({
      price: Number(this.getElement().querySelector('#event-price-1').value),
      _date: this._handleDate(),
    });

    this._callback.closeFunction(EditTripPoint.parseDataToPoint(this._data));
  }

  _handleCheckedOptions () {
    const checkedInputs = Array.from(this.getElement().querySelectorAll('.event__offer-checkbox'))
      .map((input) => {
        if (input.checked) {
          return input.getAttribute('data-option-name');
        }
      })
      .filter((item) => {
        return item;
      });

    this._data.defaultOptions.slice().map((option) => {
      const checkOption = checkedInputs.some((checked) => {
        return checked.toLowerCase() === option.title.toLowerCase();
      });

      checkOption ? option.isChecked = true : option.isChecked = false;
      return option;
    });
  }

  _handleDate () {
    const newStartTime = this.getElement().querySelector('#event-start-time-1').getAttribute('data-time');
    const newEndTime = this.getElement().querySelector('#event-end-time-1').getAttribute('data-time');

    if (newStartTime === null && newEndTime === null) {
      return this._data._date;
    }

    if (newStartTime === null) {
      return Object.assign({},
        this._data._date,
        {
          endTime: dayjs(newEndTime),
        },
      );
    }

    if (newEndTime === null) {
      return Object.assign({},
        this._data._date,
        {
          startTime: dayjs(newStartTime),
        },
      );
    }
    return Object.assign({},
      this._data._date,
      {
        startTime: dayjs(newStartTime),
        endTime: dayjs(newEndTime),
      },
    );
  }

  setHandlerForm(cb) {
    this._callback.closeFunction = cb;
    this.getElement().addEventListener('submit', this._closeForm);
  }

  setArrowButton (cb) {
    this._callback.closeArrowButton = cb;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._wrapForm);
  }
  _wrapForm(evt) {
    evt.preventDefault();
    this._callback.closeArrowButton();
  }

  static parsePointToData (obj) {
    const {options, destinationInfo, pointType, baseOptions} = obj;

    const index = baseOptions.findIndex((option) => {
      return option.type.toLowerCase() === pointType.toLowerCase();
    });


    const newArrOptions = baseOptions[index].offers.slice().map((offer) => {
      if (options.findIndex(({title}) => {return title === offer.title;}) > -1) {
        return Object.assign({}, offer, {isChecked: true});
      }
      return Object.assign({}, offer, {isChecked: false});
    });

    return Object.assign(
      {},
      obj,
      {
        defaultOptions: newArrOptions,
        hasOptions: newArrOptions.length > 0,
        hasDestinationInfo: destinationInfo.infoText.length > 0,
        infoText: destinationInfo.infoText,
        photos: destinationInfo.photos,
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToPoint (data) {
    data = Object.assign({}, data);

    data.destinationInfo.infoText = data.infoText;
    data.options = data.defaultOptions;

    delete data.defaultOptions;
    delete data.hasOptions;
    delete data.hasDestinationInfo;
    delete data.infoText;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }

  _checkboxTypeHandler (evt) {
    if (evt.target.classList.contains('event__type-label')) {
      evt.preventDefault();
      const type = evt.target.getAttribute('data-point-type');
      const index = this._data.baseOptions.findIndex((el) => {
        return el.type.toLowerCase() === type;
      });
      this.updateData({
        pointType: type,
        defaultOptions: this._data.baseOptions[index].offers,
        hasOptions: this._data.baseOptions[index].offers.length > 0,
      });
    }
  }

  _cityInputHandler (evt) {
    const city = evt.target.value;
    const cityDescription = this._data.citiesDescriptions[city];

    if (!cityDescription) {
      this.getElement().querySelector('.btn').disabled = true;
      this.getElement().querySelector('.event__rollup-btn').disabled = true;
      showErrorMassage(this.getElement(), 'Select a city from the list');
      return;
    } else {
      this.getElement().querySelector('.btn').disabled = false;
      this.getElement().querySelector('.event__rollup-btn').disabled = false;
    }

    const photos = this._data.citiesPhotos[city];
    this.updateData({
      city,
      photos,
      infoText: cityDescription,
      hasDestinationInfo: cityDescription.length > 0,
    });
  }

  _startDateChangeHandler (date) {
    const startTimeInput = this.getElement().querySelector('#event-start-time-1');
    startTimeInput.setAttribute('data-time', dayjs(date).toISOString());
    startTimeInput.value = dayjs(date).format('DD/MM/YY HH:mm');
  }

  _endDateChangeHandler (date) {
    const endTimeInput = this.getElement().querySelector('#event-end-time-1');
    endTimeInput.setAttribute('data-time', dayjs(date).toISOString());
    endTimeInput.value = dayjs(date).format('DD/MM/YY HH:mm');
  }

  _destroyStartDatePicker (date) {
    this._startDateChangeHandler(date);
    if (this._datepickerStart !== null) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
  }

  _destroyEndDatePicker (date) {
    this._endDateChangeHandler(date);
    if (this._datepickerEnd !== null) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  _checkTimeValidity () {
    const newStartTime = dayjs(this.getElement().querySelector('#event-start-time-1').getAttribute('data-time'));
    const newEndTime = dayjs(this.getElement().querySelector('#event-end-time-1').getAttribute('data-time'));
    const diff = newEndTime.diff(newStartTime);
    if (diff < 0) {
      this.getElement().querySelector('.btn').disabled = true;
      this.getElement().querySelector('.event__rollup-btn').disabled = true;
      showErrorMassage(this.getElement(), 'Invalid date. End date is earlier than start date');
    } else {
      this.getElement().querySelector('.btn').disabled = false;
      this.getElement().querySelector('.event__rollup-btn').disabled = false;
    }
  }

  _setValidity () {
    this.getElement().querySelector('#event-end-time-1').addEventListener('change', this._checkTimeValidity);
    this.getElement().querySelector('#event-start-time-1').addEventListener('change', this._checkTimeValidity);
  }

  setDeleteBtnHandler (cb) {
    this._callback.deleteClick = cb;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deletePointByClick);
  }

  _deletePointByClick (evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditTripPoint.parseDataToPoint(this._data));
  }

  clearElement () {
    super.clearElement();

    if (this._datepickerStart && this._datepickerEnd) {
      this._datepickerStart.destroy();
      this._datepickerEnd.destroy();

      this._datepickerStart = null;
      this._datepickerEnd = null;
    }
  }

  _setTimeInputDatePicker () {
    this.getElement().querySelector('.event__field-group--time').addEventListener('click', this._setPicker);
  }

  _setPicker (evt) {
    if (evt.target.tagName === 'INPUT') {
      switch (evt.target.getAttribute('name')) {
        case TimeInput.START:
          if (this._datepickerStart === null) {
            this._datepickerStart = flatpickr(
              evt.target,
              {
                dateFormat: 'd/m/y H:i',
                enableTime: true,
                defaultDate: this.getElement().querySelector('#event-start-time-1').value,
                onChange: this._startDateChangeHandler,
                onClose: this._destroyStartDatePicker,
              },
            );
          }
          this._datepickerStart.open();
          break;
        case TimeInput.END:
          if (this._datepickerEnd === null) {
            this._datepickerEnd = flatpickr(
              evt.target,
              {
                dateFormat: 'd/m/y H:i',
                enableTime: true,
                defaultDate: this.getElement().querySelector('#event-end-time-1').value,
                onChange: this._endDateChangeHandler,
                onClose: this._destroyEndDatePicker,
              },
            );
          }
          this._datepickerEnd.open();
          break;
      }
    }
  }
}
