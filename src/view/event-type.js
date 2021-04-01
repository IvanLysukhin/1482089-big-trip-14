const creatItem = (type) => {
  const lowerType = type.toLowerCase();
  return  `<div class="event__type-item">
      <input id="event-type-${lowerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerType}">
      <label class="event__type-label  event__type-label--${lowerType}" for="event-type-${lowerType}-1">${type}</label>
    </div>`;
};

export {creatItem};
