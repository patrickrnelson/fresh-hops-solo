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

function* deleteBeer(action) {
  try {
    yield axios.delete(`/api/beer/deleteBeer/${action.payload}`);

  }
  catch (error) {
    console.log('Error Deleting Beer', error);
  }
}

function* editBeerStatus(action) {
  try {
    yield axios.put(`api/beer/editBeerStatus`, action.payload);

    yield put({ type: 'FETCH_USER_BEERS' });
  }
  catch (error) {
    console.log('Error in Edit Tried Status', error);
  }
}

function* userBeersSaga() {
  yield takeLatest('FETCH_USER_BEERS', fetchUserBeers);
  yield takeLatest('DELETE_A_BEER', deleteBeer);
  yield takeLatest('EDIT_BEER_STATUS', editBeerStatus)
}

export default userBeersSaga;