import dayjs from 'dayjs';
import {generateRandomNumber} from '../utils.js';
import {DATA} from '../constants.js';

const generateRandomDate = () => {
  return dayjs().add(generateRandomNumber(-10, 10), 'day');
};

const getRandomArrayElement = (array) => {
  return array[generateRandomNumber(0, array.length - 1)].toLowerCase();
};

const getRandomArray = (array) => {
  const firstElement = generateRandomNumber(0, array.length);
  const lastElement = generateRandomNumber(0, array.length);
  return array.slice(firstElement, lastElement);
};

const getRandomPhotosArray = () => {
  return new Array(generateRandomNumber(0, 5)).fill('').map(() => {
    return `http://picsum.photos/248/152?r=${generateRandomNumber(0, 100)}`;
  });
};

const generateTripPoint = () => {

  const randomDate = generateRandomDate();
  const randomDateEnd = randomDate.add(generateRandomNumber(0, 2), 'day');
  const randomWords = DATA.RANDOM_TEXT.split('. ');
  const randomTime = randomDate.add(generateRandomNumber(0, 12), 'hour').add(generateRandomNumber(0, 60), 'minute');
  const randomUntilTime = randomTime.add(generateRandomNumber(0, 2), 'hour').add(generateRandomNumber(0, 30), 'minute');

  return {
    price: generateRandomNumber(0, 200),
    date: {
      dateStart: randomDate,
      timeStart: randomTime,
      dateEnd: randomDateEnd,
      timeEnd: randomUntilTime,
    },
    pointType: getRandomArrayElement(DATA.TRANSPORT_TYPES),
    destination: {
      city: getRandomArrayElement(DATA.CITIES),
      cities: DATA.CITIES,
    },
    options: getRandomArray(DATA.SELECTOR_SETTINGS),
    destinationInfo:
      {
        infoText: getRandomArray(randomWords).join('. '),
        photos:getRandomPhotosArray(),
      },
    isFavorite: !!generateRandomNumber(),
    //duration:,
  };
};

export {generateTripPoint};
