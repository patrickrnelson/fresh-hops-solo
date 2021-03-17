const beerDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_BEER_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

// characteristics will be on the redux state at:
// store.characteristics
export default beerDetailsReducer;