import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchRandomBeer() {

  try {

    // gets a random beer from the DB
    let beer = yield axios.get(`/api/beer/random/`);

    yield put({ type: 'SET_RANDOM_BEER', payload: beer.data });

  } catch (error) {
    console.log('Error getting beer', error);
  }
}

function* randomBeerSaga() {
  yield takeLatest('FETCH_RANDOM_BEER', fetchRandomBeer);
  //yield takeLatest('FETCH_RECOMMENDATIONS', fetchRecommendations)
}

export default randomBeerSaga;