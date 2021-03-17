import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserBeers() {
  try {

    // gets a user beers from the DB
    let userBeers = yield axios.get(`/api/beer/userBeers`);

    yield put({ type: 'SET_USER_BEERS', payload: userBeers.data });

  } catch (error) {
    console.log('Error getting user beers', error);
  }
}

function* userBeersSaga() {
  yield takeLatest('FETCH_USER_BEERS', fetchUserBeers);
}

export default userBeersSaga;