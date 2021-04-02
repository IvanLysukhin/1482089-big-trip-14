import {DATA} from './constants.js';
import {creatMenu} from './view/menu.js';
import {creatTripInfo} from './view/trip-info.js';
import {creatTripPrice} from './view/trip-price.js';
import {creatFilterForm, creatFilter} from './view/filters.js';
import {createSort} from './view/sort.js';
import {creatContentList} from './view/content-list.js';
import {createNewTripPoint} from './view/new-trip-point.js';
import {createEditTripPoint} from './view/edit-trip-point.js';
import {creatTripPoint} from './view/trip-point.js';
import {creatItem} from './view/event-type.js';
import {creatOfferSelector} from './view/offer-selector.js';
import './mock/mocks.js';

const renderElement = (parentClass, position, text) => {
  const parent = document.querySelector(parentClass);
  parent.insertAdjacentHTML(position, text);
};

// Крупные элементы
renderElement('.trip-controls__navigation', 'beforeend', creatMenu());
renderElement('.trip-main', 'afterbegin', creatTripInfo());
renderElement('.trip-info', 'beforeend', creatTripPrice());
renderElement('.trip-events', 'beforeend', createSort());
renderElement('.trip-events', 'beforeend', creatContentList());

// Формы фильтров
renderElement('.trip-controls__filters','beforeend', creatFilterForm());

// Сами фильтры
for (const filter of DATA.FILTER_TYPES) {
  renderElement('.trip-filters','afterbegin', creatFilter(filter));
}

// Точки путешествия
for (let i = 0; i < DATA.COUNT_TRIP_POINTS; i++) {
  renderElement('.trip-events__list', 'beforeend', creatTripPoint());
}

// Функция создания формы создания или редактирования точки путешествия
const renderTripPointForm = (formType) => {
  let renderFunction = createNewTripPoint();
  if (formType === 'edit') {
    renderFunction = createEditTripPoint();
  }
  renderElement('.trip-events__list', 'beforeend', renderFunction);
  for (const type of DATA.TRANSPORT_TYPES) {
    renderElement('.event__type-group', 'beforeend', creatItem(type));
  }
};

renderTripPointForm();
renderTripPointForm('edit');


// Выбор опций путешествия
for (const offer of DATA.SELECTOR_SETTINGS) {
  renderElement('.event__available-offers', 'beforeend',
    creatOfferSelector(offer.type, offer.text, offer.price));
}
