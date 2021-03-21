import { all } from 'redux-saga/effects';
import addNewBeerSaga from './newBeer.saga';
import allBeers from './allBeers.saga'
import beerDetails from './beerDetails.saga';
import characteristicsSaga from './characteristics.saga';
import loginSaga from './login.saga';
import randomBeerSaga from './randombeer.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import userBeersSaga from './userBeers.saga'

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    randomBeerSaga(),
    characteristicsSaga(),
    addNewBeerSaga(),
    beerDetails(),
    userBeersSaga(),
    allBeers(),
  ]);
}
