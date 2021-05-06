import AbstractView from '../view/abstract-view.js';
import {VISUALLY_HIDDEN} from '../constants.js';

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

const replaceElements = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  parent.replaceChild(newChild, oldChild);
};

const removeElement = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.clearElement();
};

const showHideElement = (hide , element) => {
  if (hide) {
    if (!element.classList.contains(VISUALLY_HIDDEN)) {
      element.classList.add(VISUALLY_HIDDEN);
    }
  } else {
    if (element.classList.contains(VISUALLY_HIDDEN)) {
      element.classList.remove(VISUALLY_HIDDEN);
    }
  }
};

export {render, createElementDOM, replaceElements, removeElement, showHideElement};
