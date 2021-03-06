import { combineReducers } from 'redux';
import allBeers from './allBeers.reducer';
import beerDetails from './beerDetails.reducer';
import breweries from './breweries.reducer';
import characteristics from './characteristics.reducer';
import dominantFlavors from './dominantFlavors.reducer';
import errors from './errors.reducer';
import user from './user.reducer';
import userBeers from './userBeers.reducer';
import randomBeer from './randomBeer.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  beerDetails, // contains all details about a specific beer that was clicked
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  randomBeer, // this gives us a random beer to display on the homepage
  characteristics, // gives us characteristics to select in drop down menu
  dominantFlavors, // gives us the list of dominant flavors
  userBeers, // gives us the beers saved for the logged in user
  allBeers, // gives us all of the beers in the database
  breweries // gives us all of the breweries in the database
});

export default rootReducer;
