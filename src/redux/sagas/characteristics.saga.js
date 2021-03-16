import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchRandomBeer(action) {
  let randomNumber = Math.floor(Math.random() * 119); 

  try {

    // gets a random beer from the DB
    let beer = yield axios.get(`/api/beer/random/${randomNumber}`);

    // automatically log a user in after registration
    yield put({ type: 'SET_RANDOM_BEER', payload: beer.data });

  } catch (error) {
    console.log('Error getting beer', error);
  }
}

function* randomBeerSaga() {
  yield takeLatest('FETCH_RANDOM_BEER', fetchRandomBeer);
}

export default randomBeerSaga;