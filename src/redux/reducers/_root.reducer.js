import { combineReducers } from 'redux';
import characteristics from './characteristics.reducer'
import dominantFlavors from './dominantFlavors.reducer'
import errors from './errors.reducer';
import user from './user.reducer';
import randomBeer from './randomBeer.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  randomBeer, // this gives us a random beer to display on the homepage
  characteristics, // gives us characteristics to select in drop down menu
  dominantFlavors, // gives us the list of dominant flavors
});

export default rootReducer;
