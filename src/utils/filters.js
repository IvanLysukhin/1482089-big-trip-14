import {FilterType} from '../constants';
import dayjs from 'dayjs';

export const getFilter = {
  [FilterType.EVERYTHING]: (points) => {return points;},
  [FilterType.FUTURE]: (points) => {
    return points.filter((point) => {
      return point._date.startTime.diff(dayjs()) > 0 || point._date.endTime.diff(dayjs()) > 0;
    });
  },
  [FilterType.PAST]: (points) => {
    return points.filter((point) => {
      return point._date.startTime.diff(dayjs()) < 0;
    });
  },
};

export const disableEmptyFilter = (filterType) => {
  document.querySelectorAll('.trip-filters__filter-input')
    .forEach((filterInput) => {
      if (filterInput.value === filterType) {
        filterInput.disabled = true;
      }
    });
};
