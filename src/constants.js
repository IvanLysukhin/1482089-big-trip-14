export const DATA = {
  COUNT_TRIP_POINTS: 20,
  // TRANSPORT_TYPES: ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'],
  FILTER_TYPES: ['Everything',  'Future',  'Past'],
  CITIES: ['Tokyo', 'Seul', 'Shanghai', 'Singapore', 'New-York', 'Pusan', 'Helsinki', 'Heppenheim'],
  RANDOM_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  SORT_TYPE: {
    TIME: 'sort-time',
    PRICE: 'sort-price',
    DEFAULT: 'sort-day',
  },
  POINT_TYPES: [
    {
      type:'Taxi',
      offers: [
        {
          text: 'Choose seats',
          price: 5,
        },
        {
          text: 'Switch to comfort class',
          price: 100,
        },
        {
          text: 'Choose the radio station',
          price: 60,
        },
      ],
    },
    {
      type:'Bus',
      offers: [
        {
          text: 'Choose seats',
          price: 5,
        },
        {
          text: 'Choose the radio station',
          price: 60,
        },
      ],
    },
    {
      type:'Train',
      offers: [
        {
          text: 'Choose seats',
          price: 5,
        },
        {
          text: 'Add meal',
          price: 15,
        },
        {
          text: 'Switch to comfort class',
          price: 100,
        },
        {
          text: 'Switch to business class',
          price: 200,
        },
      ],
    },
    {
      type:'Ship',
      offers: [
        {
          text: 'Choose seats',
          price: 5,
        },
        {
          text: 'Add meal',
          price: 15,
        },
        {
          text: 'Switch to comfort class',
          price: 100,
        },
        {
          text: 'Switch to business class',
          price: 200,
        },
      ],
    },
    {
      type:'Transport',
      offers: [
        {
          text: 'Choose seats',
          price: 5,
        },
      ],
    },
    {
      type:'Drive',
      offers: [
        {
          text: 'Switch to comfort class',
          price: 100,
        },
        {
          text: 'Switch to business class',
          price: 200,
        },
      ],
    },
    {
      type:'Flight',
      offers: [
        {
          text: 'Choose seats',
          price: 5,
        },
        {
          text: 'Add meal',
          price: 15,
        },
        {
          text: 'Switch to comfort class',
          price: 100,
        },
        {
          text: 'Switch to business class',
          price: 200,
        },
      ],
    },
    {
      type:'Check-in',
      offers: [
        {
          text: 'Switch to comfort class',
          price: 100,
        },
        {
          text: 'Switch to business class',
          price: 200,
        },
      ],
    },
    {
      type:'Sightseeing',
      offers: [],
    },
    {
      type:'Restaurant',
      offers: [],
    },
  ],
};
