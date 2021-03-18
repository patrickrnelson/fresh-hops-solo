const userBeersReducer = (state = [{
  beer: '',
  beer_id: 0,
  brewery: '',
  has_tried: false,
  image: '',
  is_liked: false,
  style_name: ''
}], action) => {
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