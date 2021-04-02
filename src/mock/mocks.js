import dayjs from 'dayjs';
import {generateRandomNumber} from '../utils.js';
import {DATA} from '../constants.js';

const generateRandomDate = () => {
  return dayjs().add(generateRandomNumber(-10, 10), 'day');
};

const generateRandomTime = () => {
  return dayjs().add(generateRandomNumber(0, 12), 'hour').add(generateRandomNumber(0, 60), 'minute');
};

const getRandomArrayElement = (array) => {
  return array[generateRandomNumber(0, array.length - 1)].toLowerCase();
};

const getRandomArray = (array) => {
  return new Array(generateRandomNumber(0, array.length)).fill('').map((_,index) => {
    return array[index];
  });
};

const getRandomPhotosArray = () => {
  return new Array(generateRandomNumber(0, 5)).fill('').map(() => {
    return `http://picsum.photos/248/152?r=${generateRandomNumber(0, 100)}`;
  });
};

const generateTripPoint = () => {

  const randomDate = generateRandomDate();
  const randomWords = DATA.RANDOM_TEXT.split('. ');
  const randomTime = generateRandomTime();

  return {
    price: generateRandomNumber(0, 200),
    date: {
      datetimeAtr: randomDate,
      eventDate:randomDate.format('MMM DD'),
    },
    pointType: getRandomArrayElement(DATA.TRANSPORT_TYPES),
    destination: getRandomArrayElement(DATA.CITIES),
    options: getRandomArray(DATA.SELECTOR_SETTINGS),
    destinationInfo:
      {
        infoText: getRandomArray(randomWords).join('. '),
        photos:getRandomPhotosArray(),
      },
    isFavorite: Boolean(generateRandomNumber()),
    timeFrom: randomTime.format('HH-00'),
    timeUntil: randomTime.add(generateRandomNumber(0, 2), 'hour').add(generateRandomNumber(0, 30), 'minute').format('HH-mm'),
    //duration:,
  };
};

const tripPointsArray = new Array(40).fill('').map(generateTripPoint);

export {tripPointsArray};
