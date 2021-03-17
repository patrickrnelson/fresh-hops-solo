import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header'

import Button from '@material-ui/core/Button';

function BeerDetails() {
  const history = useHistory();

  // beer details from store
  const beerDetails = useSelector(store => store.beerDetails);

  const saveBeerClick = () => {
    console.log('Save Beer');
    dispatch({
      type: 'SAVE_BEER'
    })
  }

  return (
    <div>
      <button onClick={() => {history.goBack();}}>Back</button>
      <Header />
      
      <h2 style={{ display: 'block', marginTop: '60px', marginBottom: '15px'}}>{beerDetails ? beerDetails[0].beer : ''}</h2>
        <div style={{ marginTop: '30px', marginBottom: '15px', marginLeft: '20px'}}>
          <h3>Name</h3>
          <p>{beerDetails[0].beer}</p>

          <h3>Type</h3>
          <p>{beerDetails[0].style_name}</p>

          <h3>Brewery</h3>
          <p>{beerDetails[0].brewery}</p>
        </div>

        <div style={{ marginTop: '30px', marginBottom: '50px', textAlign: 'center' }}>
          <h4>Dominant Flavor</h4>
          <p>{beerDetails[0].flavor_name}</p>
          
          <h4>Characteristics</h4>
          <ul>
            {beerDetails[0].array_agg.map((characters) => {
              return (
                <li>
                  {characters}
                </li>
              )
            })}
          </ul>
        </div>
        {/* Add Button */}
        <Button onClick={saveBeerClick}>Save Beer</Button>
      
    </div>
  )
}

export default BeerDetails;