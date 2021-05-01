import {generateRandomNumber, getRandomArray} from '../utils/common.js';
import {DATA} from '../constants.js';
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';

const getRandomArrayElement = (array) => {
  return array[generateRandomNumber(0, array.length - 1)];
};

const getRandomPhotosArray = () => {
  return new Array(generateRandomNumber(0, 5)).fill('').map(() => {
    return `http://picsum.photos/248/152?r=${generateRandomNumber(0, 100)}`;
  });
};

const generateRandomTime = () => {
  let month = generateRandomNumber(4, 5);
  const endMonth = month + generateRandomNumber();
  if (month < 10) {
    month = `0${month}`;
  }

  let day = generateRandomNumber(1, 31);
  const endDay = day + generateRandomNumber(0, 3);
  if (day < 10) {
    day = `0${day}`;
  }

  let hour = generateRandomNumber(0, 24);
  const endHour = hour + generateRandomNumber(0, 2);
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let min = generateRandomNumber(0, 60);
  const endMin = min + generateRandomNumber(0, 10);
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
  const randomWords = DATA.RANDOM_TEXT.split('. ');

  const offer = getRandomArrayElement(DATA.POINT_TYPES);
  const offersArray = offer.offers.map((element) => {
    return {
      text: element.text,
      price: element.price,
      isChecked: generateRandomNumber() > 0,
    };
  });

  return {
    id: nanoid(),
    price: generateRandomNumber(0, 200),
    _date,
    pointType: offer.type,
    city: getRandomArrayElement(DATA.CITIES),
    destinations: DATA.CITIES,
    options: offersArray,
    destinationInfo:
      {
        infoText: getRandomArray(randomWords).join('. '),
        photos:getRandomPhotosArray(),
      },
    isFavorite: !!generateRandomNumber(),
  };
};

export {generateTripPoint};
