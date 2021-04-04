import {getTravelDates} from '../utils.js';

const creatRoute = (array) => {

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

const creatTripInfo = (array) => {
  const citiesRout = creatRoute(array);
  const dates = getTravelDates(array);

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${citiesRout}</h1>
              <p class="trip-info__dates">${dates}</p>
            </div>
          </section>`;
};

export {creatTripInfo, creatRoute};
