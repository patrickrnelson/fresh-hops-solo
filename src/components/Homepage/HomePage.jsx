import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './HomePage.css';
import Header from '../Header/Header';

import { Button, Paper } from '@material-ui/core';


function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  // user from store
  const user = useSelector(store => store.user);
  // random beer from store
  const randomBeer = useSelector(store => store.randomBeer);
  const userBeers = useSelector(store => store.userBeers);
  const allBeers = useSelector(store => store.allBeers);

  const [recommendedBeers, setRecommendedBeers] = useState([]);

  // On load, grab a random beer
  useEffect(() => {
    // fetchRecommendations();
    fetchRandomBeer();
    fetchAllBeers();
    fetchUserBeers();
  }, []);

  const fetchAllBeers = () => {
    dispatch ({
      type: 'FETCH_ALL_BEERS'
    })
  }

  const fetchRandomBeer = () => {
    dispatch({
      type: 'FETCH_RANDOM_BEER',
    })
    console.log('recommendedBeers', recommendedBeers);
  }

  const fetchUserBeers = () => {
    dispatch ({
      type: 'FETCH_USER_BEERS'
    })
  }

  const loadRecommendations = () => {
    let recommendations = [];
    console.log('Get Recs');
    console.log('userBeers', userBeers);
    console.log('allBeers', allBeers);
    // start by looping through all beers
    for(let beer of allBeers) {
      let score = 0;
      // then loop through user beers
      for(let myBeer of userBeers) {
        // IF user's beer is liked 
        // Then check to see if user's beer style and dom flavor matches beer in the beer DB
        if(myBeer.is_liked === true) {
          if(myBeer.beer_style === beer.style_id) {
            // if style matches, add 2 to the score for the beer in the DB
            score += 2;
          }
          if(myBeer.dominant_flavor === beer.dominant_flavor_id) {
            // if dom flavor matches, add 3 to the score for the beer in the DB
            score += 3
          }
        }
        
      }
      // we now have a score for all of the beers in the DB based on what the user likes
      console.log('Beer score', beer.name, score);
      // only add beers that have a score > 2 to the recommendations list
      if(score > 2) {
        recommendations.push({name: beer.beer, score: score, brewery: beer.brewery, style: beer.style_name});
      }
    }
    console.log('recommendations', recommendations);
    // if the recommendations list is 5 or less, 
    // then set the local state to include those beers
    const sixRecommendations = () => {
      if(recommendations.length <= 6) {
        return setRecommendedBeers(recommendations)
      }
      // ELSE if the list is larger than 5
      // loop through the list to determine the lowest score...
      else if(recommendations.length > 6) {
        let lowestScore = recommendations[0].score;
        for(let i = 1; i < recommendations.length; i++) {
          if (recommendations[i].score < lowestScore) {
            lowestScore = recommendations[i].score;
          }
        }
        console.log('lowest score', lowestScore);
        // ... and remove any items that have that low score.
        for(let i = 0; i < recommendations.length; i++) {
          if(recommendations[i].score === lowestScore) {
            recommendations.splice(i, 1);
            // recursive function to repeat the process
            // until recommendations list is 5 or less
            return sixRecommendations();
          }
          
        }
      }
    }
    sixRecommendations();
  }

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

      <Button 
        style={{marginTop:'35px'}}
        variant='contained' 
        color='primary' 
        onClick={() => {history.push('/addbeer')} }
      > 
        Add Beer 
      </Button>

      <h2 id="secondaryText">Random Beer:</h2>
      <Button onClick={loadRecommendations}>Get some Rec's!</Button>
      
      <div className='beerCards' onClick={() => handleBeerClick(randomBeer[0].beer_id)}>
        <Paper elevation={3} style={{paddingTop:'5px'}}>
          <img className="randomImage" src ={randomBeer[0] ? randomBeer[0].image : ''} height='170'/>
          <h3 style={{ paddingLeft: '10px', paddingTop: '10px'}}>{randomBeer[0] ? randomBeer[0].beer : ''}</h3>
          <p style={{ paddingLeft: '10px' }}>{randomBeer[0] ? randomBeer[0].style_name : ''}</p>
          <p style={{ paddingLeft: '10px', paddingBottom: '10px', fontStyle: 'italic'}}>{randomBeer[0] ? randomBeer[0].brewery : ''}</p>  
        </Paper>
      </div>

      <Button onClick={fetchRandomBeer}>Refresh Beer</Button>
      
    </div>
  )
}

export default HomePage;