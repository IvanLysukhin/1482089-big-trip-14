import {generateRandomNumber, getRandomArray} from '../utils/common.js';
import {DATA, OPTIONS} from '../constants.js';
import {nanoid} from 'nanoid';

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
  return array[generateRandomNumber(0, array.length - 1)];
};

const getRandomPhotosArray = () => {
  return new Array(generateRandomNumber(0, 5)).fill('').map(() => {
    return `http://picsum.photos/248/152?r=${generateRandomNumber(0, 100)}`;
  });
};
const generateIdForOptions = (options) => {
  return options.map((option) => {
    option.id = nanoid(5);
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

const words = DATA.RANDOM_TEXT.split('. ');
const citiesDescriptions = generateRandomCitiesDescription(words);

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
    price: generateRandomNumber(0, 200),
    date: {
      dateStart,
      timeStart,
      dateEnd,
      timeEnd,
    },
    pointType: offer.type,
    city,
    citiesDescriptions,
    destinations: DATA.CITIES,
    options: offersArray,
    destinationInfo:
      {
        infoText: citiesDescriptions[city],
        photos:getRandomPhotosArray(),
      },
    isFavorite: !!generateRandomNumber(),
    duration: findDuration(),
    baseOptions,
  };
};

export {generateTripPoint};
