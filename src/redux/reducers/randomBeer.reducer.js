const randomBeerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_RANDOM_BEER':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default randomBeerReducer;