const characteristicsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CHARACTERISTICS':
      return action.payload;
    default:
      return state;
  }
};

// characteristics will be on the redux state at:
// store.characteristics
export default characteristicsReducer;