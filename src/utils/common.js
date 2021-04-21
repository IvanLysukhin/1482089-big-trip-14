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
  let timeA = 0;
  let timeB = 0;
  if (pointA.duration.search(/\dH/) !== -1) {
    timeA += pointA.duration[0] * 60;
  }

  if (pointB.duration.search(/\dH/) !== -1) {
    timeB += pointB.duration[0] * 60;
  }
  if (pointA.duration.match(/[0-9]*M/) !== null) {
    const array = pointA.duration.match(/[0-9]*M/)[0].split('');
    timeA += Number(array.splice(0, array.length - 1).join(''));
  }

  if (pointB.duration.match(/[0-9]*M/) !== null) {
    const array = pointB.duration.match(/[0-9]*M/)[0].split('');
    timeB += Number(array.splice(0, array.length - 1).join(''));
  }

  return timeB - timeA;
};

const sortPrice = (pointA, pointB) => {return pointB.price - pointA.price;};

export {generateRandomNumber, updateItem, sortTime, sortPrice};
