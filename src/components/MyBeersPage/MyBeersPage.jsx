import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';

function MyBeersPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userBeers = useSelector(store => store.userBeers)

  useLayoutEffect(() => {
    dispatch({
      type: 'FETCH_USER_BEERS'
    })
    console.log('userBeers', userBeers);
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
        state: { from: 'my beers' }
      });
    }, 300);
    return () => clearTimeout(timer);
  } // end handleBeerClick

  return(
    <>
    <Header />
    <h2 style={{ display: 'block', marginTop: '60px', marginBottom: '15px'}}>My Beers</h2>
    <div className='listLayout'>
      {userBeers.map((beer) => {
        if(beer.has_tried === true) {
          return (
            <div key={beer.beer_id} className='fancyBeerCards' onClick={() => handleBeerClick(beer.beer_id)}>
              <img className="randomImage" src={beer.image} height='180'/>
              <h3 style={{ paddingLeft: '10px', paddingTop: '10px'}}>{beer.beer}</h3>
              <p style={{ paddingLeft: '10px' }}>{beer.style_name}</p>
              <p style={{ paddingLeft: '10px', fontStyle: 'italic'}}>{beer.brewery}</p>  
            </div>
          )
        }
      })}
    </div>
    </>
  )
}

export default MyBeersPage;