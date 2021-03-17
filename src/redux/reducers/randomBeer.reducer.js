const randomBeerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_RANDOM_BEER':
      return action.payload;
    default:
      return state;
  }
};

// random beer will be on the redux state at:
// store.randomBeer
export default randomBeerReducer;