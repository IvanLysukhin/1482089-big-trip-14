import {creatMenu} from './view/menu.js';
import {creatTripInfo} from './view/trip-info.js';
import {creatTripPrice} from './view/trip-price.js';
import {creatFilters} from './view/filters.js';
import {createSort} from './view/sort.js';
import {creatContentList} from './view/content-list.js';
import {createNewTripPoint} from './view/new-trip-point.js';
import {createEditTripPoint} from './view/edit-trip-point.js';
import {creatTripPoint} from './view/trip-point.js';

const renderElement = (parentClass, position, text) => {
  const parent = document.querySelector(parentClass);
  parent.insertAdjacentHTML(position, text);
};

renderElement('.trip-controls__navigation', 'beforeend', creatMenu());
renderElement('.trip-main', 'afterbegin', creatTripInfo());
renderElement('.trip-info', 'beforeend', creatTripPrice());
renderElement('.trip-controls', 'beforeend', creatFilters());
renderElement('.trip-events', 'beforeend', createSort());
renderElement('.trip-events', 'beforeend', creatContentList());
renderElement('.trip-events__list', 'beforeend', createNewTripPoint());
renderElement('.trip-events__list', 'beforeend', createEditTripPoint());

const COUNT_TRIP_POINTS = 3;

for (let i = 0; i < COUNT_TRIP_POINTS; i++) {
  renderElement('.trip-events__list', 'beforeend', creatTripPoint());
}
