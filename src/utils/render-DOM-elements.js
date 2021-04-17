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

export {render, createElementDOM};
