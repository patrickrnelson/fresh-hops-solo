import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';

import CircularProgress from '@material-ui/core/CircularProgress';

function WantToTryPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userBeers = useSelector(store => store.userBeers)

  const [render, setRender] = useState(true)

  useEffect(() => {
    setRender(false);
    const timer = setTimeout(function() { 
      dispatch({
        type: 'FETCH_USER_BEERS'
      })
      setRender(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleBeerClick = (beerId) => {
    console.log('beerId', beerId);
    dispatch({
      type: 'FETCH_BEER_DETAILS',
      payload: beerId
    })
    const timer = setTimeout(function() { 
      history.push({
        pathname: '/details', 
        state: { from: 'want to try' }
      });
    }, 300);
    return () => clearTimeout(timer);
  } // end handleBeerClick

  return(
    <>
    <Header />
    <h2 style={{ display: 'block', marginTop: '60px', marginBottom: '15px'}}>Want to Try</h2>
    { render ?
    <div className='listLayout'>
      { userBeers.map((beer) => {
        if(beer.has_tried === false) {
          return (
            <div key={beer.beer_id} className='fancyBeerCards' onClick={() => handleBeerClick(beer.beer_id)}>
              <h3 style={{ paddingLeft: '10px', paddingTop: '10px'}}>{beer.beer}</h3>
              <p style={{ paddingLeft: '10px' }}>{beer.style_name}</p>
              <p style={{ paddingLeft: '10px', fontStyle: 'italic'}}>{beer.brewery}</p>  
            </div>
          )
        }
      })}
    </div>
    : <CircularProgress />}
    </>
  )
}

export default WantToTryPage;