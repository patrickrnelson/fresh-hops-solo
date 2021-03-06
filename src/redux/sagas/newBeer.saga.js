import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addNewBeer(action) {
  try {
    // send post data to the server
    yield axios.post(`/api/beer/addnew`, action.payload);
    console.log('POST new beer - payload', action.payload);

  } catch (error) {
    console.log('Error posting new beer', error);
  }
}

function* adminAddBeer(action) {
  try {
    yield axios.post(`/api/beer/adminaddbeer`, action.payload);
    console.log('POST admin add beer');
  } 
  catch (error) {
    console.log('Error adding new beer - admin', error);
  }

}

// if a user saves the displayed random beer
function* saveBeer(action) {
  try {
    yield axios.post(`/api/beer/savebeer`, action.payload)
  }
  catch (error) {
    console.log('ERROR in Save beer Saga', error);
  }
}

function* addNewBeerSaga() {
  yield takeLatest('ADD_NEW_BEER', addNewBeer);
  yield takeLatest('SAVE_BEER', saveBeer);
  yield takeLatest('ADMIN_ADD_BEER', adminAddBeer)
}

export default addNewBeerSaga;