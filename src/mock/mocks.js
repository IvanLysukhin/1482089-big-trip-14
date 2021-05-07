import {generateRandomNumber, getRandomArray} from '../utils/common.js';
import {DATA, OPTIONS} from '../constants.js';
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';

const PHOTO_URL_MAX = 100;
const ID_NUMBERS = 5;
const MONTHS = {
  APR: 4,
  MAY: 5,
};

const MIN_DAY = 1;
const MAX_DAY = 30;
const ADD_DAY = 30;
const MAX_HOUR = 24;
const ADD_HOUR = 2;
const MAX_MINUTES = 60;
const ADD_MINUTES = 10;
const MAX_PRICE = 200;
const MAX_PHOTOS_ARR_LENGTH = 200;

const getRandomArrayElement = (array) => {
  return array[generateRandomNumber(0, array.length - 1)];
};

const getRandomPhotosArray = () => {
  return new Array(generateRandomNumber(0, MAX_PHOTOS_ARR_LENGTH)).fill('').map(() => {
    return `http://picsum.photos/248/152?r=${generateRandomNumber(0, PHOTO_URL_MAX)}`;
  });
};
const generateIdForOptions = (options) => {
  return options.map((option) => {
    option.id = nanoid(ID_NUMBERS);
    return option;
  });
};

const generateOptionsIdArray = (optionsArray) => {
  return optionsArray.map((option) => {
    return option.id;
  });
};

const typesOffers = () => {
  const options = generateIdForOptions(OPTIONS);
  const optionsIDs = generateOptionsIdArray(options);
  return DATA.TRANSPORT_TYPES.map((type) => {
    const offers = optionsIDs.slice(0, generateRandomNumber(0, options.length - 1)).map((optionId) => {
      return options.find((option) => {return option.id === optionId;});
    });
    return {
      type,
      offers,
    };
  });
};

const baseOptions = typesOffers();

const generateRandomCitiesDescription = (words) => {
  return {
    'Tokyo':getRandomArray(words).join('. '),
    'Seul':getRandomArray(words).join('. '),
    'Shanghai':getRandomArray(words).join('. '),
    'Singapore':getRandomArray(words).join('. '),
    'New-York':getRandomArray(words).join('. '),
    'Pusan':getRandomArray(words).join('. '),
    'Helsinki':getRandomArray(words).join('. '),
    'Heppenheim':getRandomArray(words).join('. '),
  };
};

const generateRandomCitiesPhotos = () => {
  return {
    'Tokyo':getRandomPhotosArray(),
    'Seul':getRandomPhotosArray(),
    'Shanghai':getRandomPhotosArray(),
    'Singapore':getRandomPhotosArray(),
    'New-York':getRandomPhotosArray(),
    'Pusan':getRandomPhotosArray(),
    'Helsinki':getRandomPhotosArray(),
    'Heppenheim':getRandomPhotosArray(),
  };
};

const words = DATA.RANDOM_TEXT.split('. ');
const citiesDescriptions = generateRandomCitiesDescription(words);
const citiesPhotos = generateRandomCitiesPhotos();

const generateRandomTime = () => {
  let month = generateRandomNumber(MONTHS.APR, MONTHS.MAY);
  const endMonth = month + generateRandomNumber();
  if (month < 10) {
    month = `0${month}`;
  }

  let day = generateRandomNumber(MIN_DAY, MAX_DAY);
  const endDay = day + generateRandomNumber(0, ADD_DAY);
  if (day < 10) {
    day = `0${day}`;
  }

  let hour = generateRandomNumber(0, MAX_HOUR);
  const endHour = hour + generateRandomNumber(0, ADD_HOUR);
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let min = generateRandomNumber(0, MAX_MINUTES);
  const endMin = min + generateRandomNumber(0, ADD_MINUTES);
  if (min < 10) {
    min = `0${min}`;
  }

  return {
    startTime: dayjs(`2021-${month}-${day} ${hour}:${min}`),
    endTime: dayjs(`2021-${endMonth}-${endDay} ${endHour}:${endMin}`),
  };
};

const generateTripPoint = () => {
  const _date = generateRandomTime();
  const offer = getRandomArrayElement(baseOptions);

  const offersArray = offer.offers.map((element) => {
    return {
      text: element.text,
      price: element.price,
      isChecked: generateRandomNumber() > 0,
    };
  });
  const city = getRandomArrayElement(DATA.CITIES);

  return {
    id: nanoid(),
    price: generateRandomNumber(0, MAX_PRICE),
    _date,
    pointType: offer.type,
    city,
    citiesDescriptions,
    citiesPhotos,
    destinations: DATA.CITIES,
    options: offersArray,
    destinationInfo:
      {
        infoText: citiesDescriptions[city],
        photos:citiesPhotos[city],
      },
    isFavorite: !!generateRandomNumber(),
    baseOptions,
  };
};

export {generateTripPoint};
