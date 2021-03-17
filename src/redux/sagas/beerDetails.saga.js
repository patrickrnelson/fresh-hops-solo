import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchBeerDetails(action) {
  try {

    // gets the characteristics from the DB
    let beerDetails = yield axios.get(`/api/beer/details/${action.payload}`);
    console.log('GET Beer Details', beerDetails.data);

    // SET the characteristics in the reducer
    yield put({ type: 'SET_BEER_DETAILS', payload: beerDetails.data });

  } catch (error) {
    console.log('Error getting beer details', error);
  }
}

function* beerDetailsSaga() {
  yield takeLatest('FETCH_BEER_DETAILS', fetchBeerDetails);
}

export default beerDetailsSaga;