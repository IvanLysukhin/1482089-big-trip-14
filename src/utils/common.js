import dayjs from 'dayjs';

const getRandomArrayElement = (array) => {
  return array[generateRandomNumber(0, array.length - 1)];
};

const generateRandomNumber= function (min = 0 , max = 1, point = 0) {
  const num = Math.random() * (max - min) + min; // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%B2_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D0%B5
  return Number(num.toFixed(point));  //https://learn.javascript.ru/number#okruglenie
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const sortTime = (pointA, pointB) => {
  return pointB._date.endTime.diff(pointB._date.startTime) - pointA._date.endTime.diff(pointA._date.startTime);
};

const sortPrice = (pointA, pointB) => {return pointB.price - pointA.price;};
const sortDate = (pointA, pointB) => {
  return dayjs(pointA._date.startTime).unix() - dayjs(pointB._date.startTime).unix();
};

const getRandomArray = (array) => {
  const start = generateRandomNumber(0, array.length);
  const end =  generateRandomNumber(start, array.length);
  return array.slice(start, end);
};

const showErrorMassage = (parent) => {
  const errorMessage = document.createElement('div');
  errorMessage.textContent = 'Invalid date. End date is earlier than start date';
  errorMessage.style.textAlign = 'center';
  errorMessage.style.fontWeight = 'bold';
  errorMessage.style.fontFamily = 'Montserrat';
  errorMessage.style.textTransform = 'uppercase';
  errorMessage.style.background = '#ffd054';
  errorMessage.style.width = '100%';
  errorMessage.style.color = 'black';
  errorMessage.style.top = '0';
  errorMessage.style.position = 'absolute';
  errorMessage.style.borderTopRightRadius = '18px';
  errorMessage.style.borderTopLeftRadius = '18px';
  errorMessage.style.opacity = '0.8';
  parent.style.position = 'relative';
  parent.appendChild(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, 5000);
};

const sumTypesPrices = (typesArray, pointsArr) => {
  const pricesArray = [];
  typesArray.forEach((type) => {
    pricesArray.push(pointsArr.reduce((accumulator, point) => {
      if (type.toLowerCase() === point.pointType.toLowerCase()) {
        accumulator += point.price;
        return accumulator;
      } else {
        return accumulator;
      }
    },0));
  });
  return pricesArray;
};

const countTypes = (typesArray, pointsArr) => {
  const pricesArray = [];
  typesArray.forEach((type) => {
    pricesArray.push(pointsArr.reduce((accumulator, point) => {
      if (type.toLowerCase() === point.pointType.toLowerCase()) {
        accumulator += 1;
        return accumulator;
      } else {
        return accumulator;
      }
    },0));
  });
  return pricesArray;
};

const sumTimeSpend = (typesArray, pointsArr) => {
  const pricesArray = [];
  typesArray.forEach((type) => {
    pricesArray.push(pointsArr.reduce((accumulator, point) => {
      if (type.toLowerCase() === point.pointType.toLowerCase()) {
        accumulator += point._date.endTime.diff(point._date.startTime, 'minute');
        return accumulator;
      } else {
        return accumulator;
      }
    },0));
  });
  return pricesArray;
};

const MINUTES_IN_DAY = 1440;
const MINUTES_IN_HOUR = 60;

const findDuration = (diff) => {
  const daysInMinutes = Math.floor(diff / MINUTES_IN_DAY);
  const hoursInMinutes = Math.floor((diff  % MINUTES_IN_DAY)/MINUTES_IN_HOUR);

  let days = `${daysInMinutes}D`;

  let hour = ` ${hoursInMinutes}H `;

  let minutes =`${(diff  % MINUTES_IN_DAY)%MINUTES_IN_HOUR}M`;

  if (daysInMinutes < 1) {
    days = '';
  }

  if (hoursInMinutes < 1) {
    hour = ' ';
  }

  if (minutes < 1) {
    minutes = '';
  }

  return `${days}${hour}${minutes}`;
};

const makeObj = (nameTypeArr, numbresArr) => {
  return nameTypeArr.map((name, index) => {
    return {
      name,
      price: numbresArr[index],
    };
  });
};

const makeRange =  (names, numbers) => {
  const arr = makeObj(names,numbers).sort((pointA, pointB) => {
    return pointB.price - pointA.price;
  });

  return {
    types:  arr.map((el) => {return el.name;}),
    numbers:  arr.map((el) => {return el.price;}),
  };
};

const showDownloadError = () => {
  const errorMessage = document.createElement('div');
  const errorText = document.createElement('div');
  errorMessage.appendChild(errorText);
  errorText.innerHTML = 'Download error. <a href="">Please try again</a>';
  errorText.lastChild.style.color = 'black';
  errorMessage.style.textAlign = 'center';
  errorMessage.style.verticalAlign = 'middle';
  errorMessage.style.fontWeight = 'bold';
  errorMessage.style.fontFamily = 'Montserrat';
  errorMessage.style.fontSize = '40px';
  errorMessage.style.textTransform = 'uppercase';
  errorMessage.style.background = '#1E90FF';
  errorMessage.style.width = '100%';
  errorMessage.style.height = '100%';
  errorMessage.style.color = 'black';
  errorMessage.style.top = '0';
  errorMessage.style.position = 'absolute';
  errorMessage.style.opacity = '0.7';
  errorMessage.style.display = 'flex';
  errorMessage.style.justifyContent = 'center';
  errorMessage.style.alignItems = 'center';
  document.querySelector('body').appendChild(errorMessage);
  // setTimeout(() => {
  //   errorMessage.remove();
  // }, 5000);
};


export {generateRandomNumber, updateItem, sortTime, sortPrice, sortDate, getRandomArray, getRandomArrayElement, showErrorMassage, sumTypesPrices, countTypes, sumTimeSpend, findDuration, makeRange, showDownloadError};
