import AbstractView from './abstract-view.js';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax);

const createRoute =  (array) => {
  const datesStartArr = new Array(array.length).fill('').map((_, i) => {
    return array[i]._date.startTime;
  });const datesEndArr = new Array(array.length).fill('').map((_, i) => {
    return array[i]._date.endTime;
  });

  const firsPointIndex = array.findIndex((point) => {
    return point._date.startTime === dayjs.min(datesStartArr);
  });

  const lastPointIndex = array.findIndex((point) => {
    return point._date.endTime === dayjs.max(datesEndArr);
  });
  if (array.length > 3) {
    return `${array[firsPointIndex].city} — . . . — ${array[lastPointIndex].city}`;
  } else {
    return array.slice().sort((pointA, pointB) => {
      return pointA._date.startTime.diff(pointB._date.startTime);
    }).map((point)=>{return point.city;}).join(' — ');
  }
};

const routeDates = (array) => {
  const startDates = new Array(array.length).fill('').map((_, i) => {
    return array[i]._date.startTime;
  });
  const endDates = new Array(array.length).fill('').map((_, i) => {
    return array[i]._date.endTime;
  });

  if (!dayjs.min(startDates) || !dayjs.max(endDates)) {
    return '';
  }

  const minDate = dayjs.min(startDates).format('MMM DD');
  const maxDate = dayjs.max(endDates).format('MMM DD');
  return `${minDate} — ${maxDate}`;
};

const createTripInfo = (array) => {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${createRoute(array)}</h1>
              <p class="trip-info__dates">${routeDates(array)}</p>
            </div>
          </section>`;
};

export default class TripInfoView extends AbstractView {
  constructor(array) {
    super();
    this._array = array;
  }

  getTemplate() {
    return createTripInfo(this._array);
  }
}
