const breweriesReducer = (state = [{id: 0, name: '', image_url: '', image_desc: ''}], action) => {
  switch (action.type) {
    case 'SET_BREWERIES':
      return action.payload;
    default:
      return state;
  }
};

// characteristics will be on the redux state at:
// store.characteristics
export default breweriesReducer;