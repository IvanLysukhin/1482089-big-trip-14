import AbstractView from './abstract-view.js';

const sumTripPrice = (array) => {
  return array.reduce((accumulator,obj) => {
    const offersPriceSum =  obj.options.reduce((accumulator, option) => {
      if (option.isChecked) {
        return accumulator + option.price;
      }
      return accumulator;
    }, 0);

    return accumulator + obj.price + offersPriceSum;
  }, 0);
};


const createTripPrice = (array) => {
  const price = sumTripPrice(array);
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
           </p>`;
};

export default class TripPrice extends AbstractView {
  constructor(array) {
    super();
    this._array = array;
  }

  getTemplate() {
    return createTripPrice(this._array);
  }
}
