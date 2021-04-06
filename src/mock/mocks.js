import {generateRandomNumber} from '../utils.js';
import {DATA} from '../constants.js';

const generateRandomDate = () => {
  const months =['APR', 'MAR'];

  return {
    date: generateRandomNumber(5, 30),
    month: months[generateRandomNumber()],
    timeHour: generateRandomNumber(10, 12),
    timeMinute: generateRandomNumber(10, 30),
  };
};

const getRandomArrayElement = (array) => {
  return array[generateRandomNumber(0, array.length - 1)].toLowerCase();
};

const getRandomArray = (array) => {
  return array.slice(generateRandomNumber(0, array.length), generateRandomNumber(0, array.length));
};

const getRandomPhotosArray = () => {
  return new Array(generateRandomNumber(0, 5)).fill('').map(() => {
    return `http://picsum.photos/248/152?r=${generateRandomNumber(0, 100)}`;
  });
};

const generateTripPoint = () => {
  const date = generateRandomDate().date;
  const month = generateRandomDate().month;
  const nextDay = date + generateRandomNumber(0, 5);
  const startHour = generateRandomDate().timeHour;
  const startMinute = generateRandomDate().timeMinute;
  const endHour = startHour + generateRandomNumber(0, 5);
  const endMinute = startMinute + generateRandomNumber(0, 5);

  const dateStart = `${month} ${date}`;
  const dateEnd = `${month} ${nextDay}`;
  const timeStart = `${startHour}:${startMinute}`;
  const timeEnd = `${endHour}:${endMinute}`;

  const findDurationHour = (...times) => {
    const array = times.sort();
    return array[1] - array[0];
  };

  const findDurationMinute = (...times) => {
    const array = times.sort();
    return array[1] - array[0];
  };

  const findDuration = () => {
    const hour = findDurationHour(startHour, endHour);
    const minute = findDurationMinute(startMinute, endMinute);
    if (!hour) {
      return `${minute}M`;
    }
    if (!minute) {
      return `${hour}H`;
    }
    return `${hour}H ${minute}M`;
  };

  const randomWords = DATA.RANDOM_TEXT.split('. ');


  return {
    price: generateRandomNumber(0, 200),
    date: {
      dateStart,
      timeStart,
      dateEnd,
      timeEnd,
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
    duration: findDuration(),
  };
};

export {generateTripPoint};
