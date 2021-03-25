import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchBreweries() {

  try {

    let breweries = yield axios.get('/api/breweries');
    // automatically log a user in after registration
    yield put({ type: 'SET_BREWERIES', payload: breweries.data });

  }
  catch (error) {
    console.log('Error in getting recommendations', error);
  }
}

function* breweriesSaga() {
  yield takeLatest('FETCH_BREWERIES', fetchBreweries);
  //yield takeLatest('FETCH_RECOMMENDATIONS', fetchRecommendations)
}

export default breweriesSaga;