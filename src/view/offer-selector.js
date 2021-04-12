const createOfferSelector = (array) => {
  return array.map((offer) => {
    const {type,  text,  price} = offer;
    return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}">
            <label class="event__offer-label" for="event-offer-${type}-1">
              <span class="event__offer-title">${text}</span>
                          &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`;
  }).join('');
};
export {createOfferSelector};
