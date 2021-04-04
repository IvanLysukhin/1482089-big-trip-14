import {sumTripPrice} from '../utils.js';

const creatTripPrice = (array) => {
  const price = sumTripPrice(array);
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
           </p>`;
};


export {creatTripPrice};
