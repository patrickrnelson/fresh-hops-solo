import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllBeers() {

  try {

    let allBeers = yield axios.get('/api/beer/allbeers');
    // automatically log a user in after registration
    yield put({ type: 'SET_ALL_BEERS', payload: allBeers.data });

  }
  catch (error) {
    console.log('Error in getting recommendations', error);
  }
}

function* allBeersSaga() {
  yield takeLatest('FETCH_ALL_BEERS', fetchAllBeers);
  //yield takeLatest('FETCH_RECOMMENDATIONS', fetchRecommendations)
}

export default allBeersSaga;