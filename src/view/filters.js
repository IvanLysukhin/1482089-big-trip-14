const creatFilterForm = () => {
  return `<form class="trip-filters" action="#" method="get">
              <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

const creatFilter = (filterText) => {
  const lowerFilterType = filterText.toLowerCase();
  return `<div class="trip-filters__filter">
             <input id="filter-${lowerFilterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${lowerFilterType}">
             <label class="trip-filters__filter-label" for="filter-${lowerFilterType}">${filterText}</label>
           </div>`;
};


export {creatFilterForm, creatFilter};
