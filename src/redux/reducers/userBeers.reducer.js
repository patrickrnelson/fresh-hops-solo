const userBeersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_BEERS':
      return action.payload;
    default:
      return state;
  }
};

// random beer will be on the redux state at:
// store.randomBeer
export default userBeersReducer;