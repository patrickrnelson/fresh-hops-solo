import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './HomePage.css';
import Header from '../Header/Header';

import Button from '@material-ui/core/Button';


function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  // user from store
  const user = useSelector(store => store.user)
  // random beer from store
  const randomBeer = useSelector(store => store.randomBeer)

  // On load, grab a random beer
  useEffect(() => {
    dispatch({
      type: 'FETCH_RANDOM_BEER',
    })
  }, []);

  // Beer card Click
  const handleBeerClick = (beerId) => {
    console.log('beerId', beerId);
    dispatch({
      type: 'FETCH_BEER_DETAILS',
      payload: beerId
    })

    history.push({
      pathname: '/details', 
      state: { from: 'home' }
    });
  } // end handleBeerClick

  return (
    <div id='pageContainer'>
      <Header />
      
      <h1 id="greetingText">Hi, {user.name}!</h1>

      <h2 id="secondaryText">Random Beer:</h2>

      <div className='beerCards' onClick={() => handleBeerClick(randomBeer[0].beer_id)}>
        <img className="randomImage" src ={randomBeer[0] ? randomBeer[0].image : ''} height='180'/>
        <h3 style={{ paddingLeft: '10px', paddingTop: '10px'}}>{randomBeer[0] ? randomBeer[0].beer : ''}</h3>
        <p style={{ paddingLeft: '10px' }}>{randomBeer[0] ? randomBeer[0].style_name : ''}</p>
        <p style={{ paddingLeft: '10px', fontStyle: 'italic'}}>{randomBeer[0] ? randomBeer[0].brewery : ''}</p>  
      </div>

      <Button onClick={() => {history.push('/addbeer')} }> Add Beer </Button>
      
    </div>
  )
}

export default HomePage;