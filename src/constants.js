export const DATA = {
  TRANSPORT_TYPES: ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'],
  FILTER_TYPES: ['Everything',  'Future',  'Past'],
};

export const SortType =  {
  TIME: 'sort-time',
  PRICE: 'sort-price',
  DEFAULT: 'sort-day',
  EVENT: 'sort-event',
  OFFER: 'sort-offer',
};

export const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  RESET_TASK: 'RESET_TASK',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const VISUALLY_HIDDEN = 'visually-hidden';

export const PAGE_CONDITION = {
  TABLE: 'Table',
  STATS: 'Stats',
};

export const BAR_HEIGHT = 55;
export const DATA_LABELS_FONT_SIZE = 13;
export const TITLE_FONT_SIZE = 23;
export const BAR_THICKNESS = 44;
export const MIN_BAR_LENGTH = 50;
export const MIN_BAR_LENGTH_TIMES = 100;
export const PADDING = 5;
export const HEIGHT_MULTIPLIER = 7;

export const TimeInputs = {
  START: 'event-start-time',
  END: 'event-end-time',
};
export const pointMode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export const SHOW_TIME = 5000;

export const SHAKE_TIMEOUT = 600;

export const MINUTES_IN_DAY = 1440;
export const MINUTES_IN_HOUR = 60;

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  POST: 'POST',
};

export const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
export const AUTHORIZATION = 'Basic ivanlysukhin270695';
export const STORE_PREFIX = 'big-trip-localstorage';
export const STORE_VER = 'v14';

