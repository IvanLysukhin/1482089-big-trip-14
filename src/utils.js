const generateRandomNumber= function (min = 0 , max = 1, point = 0) {
  const num = Math.random() * (max - min) + min; // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%B2_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D0%B5
  return Number(num.toFixed(point));  //https://learn.javascript.ru/number#okruglenie
};

const sumTripPrice = (array) => {
  return array.reduce((accumulator,obj) => {
    const offersPriceSum =  obj.options.reduce((accumulator, option) => {
      return accumulator + option.price;
    }, 0);

    return accumulator + obj.price + offersPriceSum;
  }, 0);
};

const renderElement = (parentClass, position, text) => {
  const parent = document.querySelector(parentClass);
  parent.insertAdjacentHTML(position, text);
};

const render = (parent, element, position) => {

  if (position === 'beforeend') {
    parent.append(element);
  } else {parent.prepend(element);}
};

const createElementDOM = (template) => {
  const parent = document.createElement('div');
  parent.innerHTML = template;
  return parent.firstChild;
};

export {generateRandomNumber, sumTripPrice, renderElement, render, createElementDOM};
