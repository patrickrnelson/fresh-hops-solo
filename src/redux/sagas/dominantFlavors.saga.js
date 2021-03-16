import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchDominantFlavors() {
  try {

    // gets the characteristics from the DB
    let characteristics = yield axios.get(`/api/beer/characteristics/`);
    console.log('GET dominant flavors', characteristics.data);

    // SET the characteristics in the reducer
    yield put({ type: 'SET_DOMINANT_FLAVORS', payload: characteristics.data });

  } catch (error) {
    console.log('Error getting characteristics', error);
  }
}

function* dominantFlavorsSaga() {
  yield takeLatest('FETCH_CHARACTERISTICS', fetchDominantFlavors);
}

export default dominantFlavorsSaga;