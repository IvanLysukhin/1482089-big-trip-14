import {createElementDOM} from '../utils.js';

const createRoute = (array) => {

  const citiesArray = new Array(array.length).fill('').map((_, i) => {
    return array[i].destination.city;
  });

  if (array.length > 3) {
    return `${citiesArray[0]} — . . . — ${citiesArray[citiesArray.length - 1]}`;
  } else {
    return citiesArray.filter((item, index) => {
      return citiesArray.indexOf(item) === index;
    }).join(' — ');
  }
};

const getRank = (date) => {
  let rank = 0;

  if ( date.includes('MAR')) {
    rank += 2;
  }
  return rank;
};

const routeDates = (array) => {
  const startDates = new Set(array.map((_, i) => {
    return array[i].date.dateStart;
  }));
  const startDatesArray = Array.from(startDates);
  return startDatesArray.sort((a, b) => {
    const rankA = getRank(a);
    const rankB = getRank(b);
    return rankA - rankB;
  });
};

const createTripInfo = (array) => {
  const citiesRout = createRoute(array);
  const first = routeDates(array)[routeDates(array).length - 1];
  const last = routeDates(array)[0];
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${citiesRout}</h1>
              <p class="trip-info__dates">${first} — ${last}</p>
            </div>
          </section>`;
};

export default class TripInfo {
  constructor(array) {
    this._element = null;
    this._array = array;
  }

  getTemplate() {
    return createTripInfo(this._array);
  }

  getElement() {
    if (!this._element) {
      this._element = createElementDOM(this.getTemplate());
    }
    return this._element;
  }

  clearElement() {
    this._element = null;
  }
}
