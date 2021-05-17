import dayjs from 'dayjs';
import {SHOW_TIME, MINUTES_IN_DAY, MINUTES_IN_HOUR} from '../constants.js';

export const updateItem = (items, update) => {
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

export const sortTime = (pointA, pointB) => {
  return pointB._date.endTime.diff(pointB._date.startTime) - pointA._date.endTime.diff(pointA._date.startTime);
};

export const sortPrice = (pointA, pointB) => {return pointB.price - pointA.price;};
export const sortDate = (pointA, pointB) => {
  return dayjs(pointA._date.startTime).unix() - dayjs(pointB._date.startTime).unix();
};

export const showErrorMassage = (parent, message) => {
  const errorMessage = document.createElement('div');
  errorMessage.textContent = message;
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
  }, SHOW_TIME);
};

export const sumTypesPrices = (typesArray, pointsArr) => {
  const prices = [];
  typesArray.forEach((type) => {
    prices.push(pointsArr.reduce((accumulator, point) => {
      if (type.toLowerCase() === point.pointType.toLowerCase()) {
        accumulator += point.price;
        return accumulator;
      } else {
        return accumulator;
      }
    },0));
  });
  return prices;
};

export const countTypes = (typesArray, pointsArr) => {
  const prices = [];
  typesArray.forEach((type) => {
    prices.push(pointsArr.reduce((accumulator, point) => {
      if (type.toLowerCase() === point.pointType.toLowerCase()) {
        accumulator += 1;
        return accumulator;
      } else {
        return accumulator;
      }
    },0));
  });
  return prices;
};

export const sumTimeSpend = (typesArray, pointsArr) => {
  const prices = [];
  typesArray.forEach((type) => {
    prices.push(pointsArr.reduce((accumulator, point) => {
      if (type.toLowerCase() === point.pointType.toLowerCase()) {
        accumulator += point._date.endTime.diff(point._date.startTime, 'minute');
        return accumulator;
      } else {
        return accumulator;
      }
    },0));
  });
  return prices;
};

export const findDuration = (diff) => {
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

export const makeObj = (nameTypeArr, numbersArr) => {
  return nameTypeArr.map((name, index) => {
    return {
      name,
      price: numbersArr[index],
    };
  });
};

export const makeRange =  (names, numbers) => {
  const arr = makeObj(names,numbers).sort((pointA, pointB) => {
    return pointB.price - pointA.price;
  });

  return {
    types:  arr.map((el) => {return el.name;}),
    numbers:  arr.map((el) => {return el.price;}),
  };
};

export const showDownloadError = () => {
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
};

export const isOnline = () => {
  return window.navigator.onLine;
};

export const showErrorToast = (message) => {
  const toastContainer = document.createElement('div');
  toastContainer.classList.add('toast-container');
  document.body.append(toastContainer);

  const toastItem = document.createElement('div');
  toastItem.textContent = message;
  toastItem.classList.add('toast-item');

  toastContainer.append(toastItem);

  setTimeout(() => {
    toastItem.remove();
    toastContainer.remove();
  }, SHOW_TIME);
};
