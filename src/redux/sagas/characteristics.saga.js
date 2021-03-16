import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCharacteristics() {
  try {

    // gets the characteristics from the DB
    let characteristics = yield axios.get(`/api/beer/characteristics/`);
    console.log('GET characteristics', characteristics.data);

    // SET the characteristics in the reducer
    yield put({ type: 'SET_CHARACTERISTICS', payload: characteristics.data });

  } catch (error) {
    console.log('Error getting characteristics', error);
  }
}

function* characteristicsSaga() {
  yield takeLatest('FETCH_CHARACTERISTICS', fetchCharacteristics);
}

export default characteristicsSaga;