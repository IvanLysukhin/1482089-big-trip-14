export const DATA = {
  COUNT_TRIP_POINTS: 20,
  TRANSPORT_TYPES: ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'],
  FILTER_TYPES: ['Everything',  'Future',  'Past'],
  CITIES: ['Tokyo', 'Seul', 'Shanghai', 'Singapore', 'New-York', 'Pusan', 'Helsinki', 'Heppenheim'],
  RANDOM_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  SORT_TYPE: {
    TIME: 'sort-time',
    PRICE: 'sort-price',
    DEFAULT: 'sort-day',
  },
};

export const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const OPTIONS = [
  {
    text: 'Choose seats',
    price: 5,
  },
  {
    text: 'Add meal',
    price: 15,
  },
  {
    text: 'Choose the radio station',
    price: 60,
  },
  {
    text: 'Switch to business class',
    price: 200,
  },
  {
    text: 'Switch to comfort class',
    price: 100,
  },
  {
    text: 'Switch to business class',
    price: 200,
  },
];

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
