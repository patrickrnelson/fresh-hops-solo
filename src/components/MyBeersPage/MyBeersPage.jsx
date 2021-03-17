import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MyBeersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_BEERS'
    })
  }, []);

  return(
    <>
    {/* <div className='fancyBeerCards' onClick={() => handleBeerClick(randomBeer[0].beer_id)}>
      <img className="randomImage" src ={randomBeer[0] ? randomBeer[0].image : ''} height='180'/>
      <h3 style={{ paddingLeft: '10px', paddingTop: '10px'}}>{randomBeer[0] ? randomBeer[0].beer : ''}</h3>
      <p style={{ paddingLeft: '10px' }}>{randomBeer[0] ? randomBeer[0].style_name : ''}</p>
      <p style={{ paddingLeft: '10px', fontStyle: 'italic'}}>{randomBeer[0] ? randomBeer[0].brewery : ''}</p>  
    </div> */}
    </>
  )
}

export default MyBeersPage;