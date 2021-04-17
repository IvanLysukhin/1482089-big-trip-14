import AbstractView from '../view/abstract-view.js';
const render = (parent, element, position) => {

  if (parent instanceof AbstractView) {
    parent = parent.getElement();
  }

  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  if (position === 'beforeend') {
    parent.append(element);
  } else {parent.prepend(element);}

};

const createElementDOM = (template) => {
  const parent = document.createElement('div');
  parent.innerHTML = template;
  return parent.firstChild;
};

export {render, createElementDOM};
