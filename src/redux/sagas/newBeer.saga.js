import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addNewBeer(action) {
  try {

    // gets the characteristics from the DB
    yield axios.post(`/api/beer/addnew`, action.payload);
    console.log('POST new beer - payload', action.payload);

    // Will eventually need to SET user beers
    // yield put({ type: 'SET_USER_BEERS', payload: characteristics.data });

  } catch (error) {
    console.log('Error posting new beer', error);
  }
}

function* addNewBeerSaga() {
  yield takeLatest('ADD_NEW_BEER', addNewBeer);
}

export default addNewBeerSaga;