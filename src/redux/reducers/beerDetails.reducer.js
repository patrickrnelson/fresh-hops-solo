const beerDetailsReducer = (state = [{array_agg: [], beer: '', brewery: '', flavor_name: '', style_name: ''}], action) => {
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