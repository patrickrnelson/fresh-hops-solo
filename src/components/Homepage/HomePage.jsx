import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './HomePage.css';
import Header from '../Header/Header';

import { Button, Paper, Grid } from '@material-ui/core';

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
  const [recommendationsNumber, setRecommendationsNumber] = useState(5)

  // On load, grab a random beer
  useEffect(() => {
    // fetchRecommendations();
    fetchUserBeers();
    fetchAllBeers();
    fetchRandomBeer();
    fetchBreweries();
  }, []);

  const fetchAllBeers = () => {
    dispatch ({
      type: 'FETCH_ALL_BEERS'
    })
    loadRecommendations();
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

  const fetchBreweries = () => {
    dispatch ({
      type: 'FETCH_BREWERIES'
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
            // if flavors match, plus 1 to the score
            if(myBeer.flavor_array[0] === beer.flavor_array[0] || 
              myBeer.flavor_array[0] === beer.flavor_array[1] || 
              myBeer.flavor_array[0] === beer.flavor_array[2]) {
                score += 1
            }
            if(myBeer.flavor_array[1] === beer.flavor_array[0] || 
              myBeer.flavor_array[1] === beer.flavor_array[1] || 
              myBeer.flavor_array[1] === beer.flavor_array[2]) {
                score += 1
            }
            if(myBeer.flavor_array[2] === beer.flavor_array[0] || 
              myBeer.flavor_array[2] === beer.flavor_array[1] || 
              myBeer.flavor_array[2] === beer.flavor_array[2]) {
                score += 1
              }
          }
      }
      // we now have a score for all of the beers in the DB based on what the user likes
      // only add beers that have a score > 2 to the recommendations list
      if(score > 2) {
        recommendations.push({
          id: beer.beer_id,
          name: beer.beer, 
          score: score, 
          brewery: beer.brewery, 
          style: beer.style_name, 
          image: beer.image});
      }
    }
    // Remove beers from the recommendations array that are also in userBeers list
    // loop through the recommendations list & the userBeers list
    const removeDuplicates = () => {
      for(let myBeer of userBeers) {
        for(let i=0; i < recommendations.length; i++) {
          // if a beer in the recs list matches a beer in the users list
          // remove it
          if(recommendations[i].id == myBeer.beer_id) {
            recommendations.splice(i, 1)
          }
        }
      }
      return console.log('recommendations after userBeers', recommendations);
    }
    removeDuplicates();

    
    // if the recommendations list is 10 or less, 
    // then set the local state to include those beers
    const sixRecommendations = () => {
      if(recommendations.length <= 10) {
        return setRecommendedBeers(recommendations)
      }
      // ELSE if the list is larger than 10
      // loop through the list to determine the lowest score...
      else if(recommendations.length > 10) {
        let lowestScore = recommendations[0].score;
        for(let i = 1; i < recommendations.length; i++) {
          if (recommendations[i].score < lowestScore) {
            lowestScore = recommendations[i].score;
          }
        }
        // ... and remove any items that have that low score.
        for(let i = 0; i < recommendations.length; i++) {
          if(recommendations[i].score === lowestScore) {
            recommendations.splice(i, 1);
            // recursive function to repeat the process
            // until recommendations list is 10 or less
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
      
      <h1 id="greetingText">Welcome, {user.name}!</h1>
      {userBeers.length < 1 ?
      <div style={{textAlign: 'left'}}>
        <p style={{marginTop: '20px', padding: '2px 25px'}}>To get started, search through our list of beers to find one that you like.</p>
        <p style={{marginTop: '5px', padding: '2px 25px'}}>Add beers that you like to get personalized recommendations</p>
      </div>
      :<div style={{textAlign: 'center'}}>
        <p style={{marginTop: '20px', padding: '2px 25px'}}>Add more beers that you like to get different recommendations</p>
        
      </div>}

      <Button 
        style={{marginTop:'20px'}}
        variant='contained' 
        color='primary' 
        onClick={() => {history.push('/searchbeers')} }
      > 
        Search Beers
      </Button>

      {userBeers.length > 0 ?
        <h2 id="secondaryText">Personalized Recommendations:</h2>
      : <div></div>}
      {userBeers.length > 0 && recommendedBeers.length === 0 ?
        <Button 
          style={{marginTop:'15px'}}
          variant='contained' 
          onClick={loadRecommendations}>Click for Recommendations!</Button>
      : <div></div>}
      
      {/* 
        IF the user has added beers, then show them recommendations 
        ELSE if the user has no beers, show them a random beer*/}
      {userBeers.length > 0 ? (recommendedBeers.slice(0, recommendationsNumber)).map((oneRecommendation) => {
        return (
          <>
          <Grid container key={oneRecommendation.id} justify='center' className='beerCards' minWidth='250px' onClick={() => handleBeerClick(oneRecommendation.id)}>
            <Grid item lg={2} xs={9} justify='center'>
            <Paper elevation={3} style={{paddingTop:'5px'}}>
              <div style={{minHeight: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img className="randomImage" src ={oneRecommendation ? oneRecommendation.image : ''} 
                    alt={oneRecommendation.image_desc} style={{maxHeight: '160px', maxWidth: '160px'}}/>
              </div>
              <h3 style={{ paddingLeft: '10px', paddingTop: '10px'}}>{oneRecommendation ? oneRecommendation.name : ''}</h3>
              <p style={{ paddingLeft: '10px' }}>{oneRecommendation ? oneRecommendation.style : ''}</p>
              <p style={{ paddingLeft: '10px', paddingBottom: '10px', fontStyle: 'italic'}}>{oneRecommendation ? oneRecommendation.brewery : ''}</p>  
            </Paper>
            </Grid>
          </Grid>
          
          </>
        )
      }) 
      : <>
        <h2 style={{marginTop:'20px'}}>Random Beer:</h2>
        <Grid container justify='center' className='beerCards' onClick={() => handleBeerClick(randomBeer[0].beer_id)}>
          <Grid item lg={3} xs={9} justify='center'>
          <Paper elevation={3} style={{paddingTop:'5px'}}>
            <img className="randomImage" src ={randomBeer[0] ? randomBeer[0].image : ''} alt={randomBeer[0] ? randomBeer[0].image_desc : ''} height='170'/>
            <h3 style={{ paddingLeft: '10px', paddingTop: '10px'}}>{randomBeer[0] ? randomBeer[0].beer : ''}</h3>
            <p style={{ paddingLeft: '10px' }}>{randomBeer[0] ? randomBeer[0].style_name : ''}</p>
            <p style={{ paddingLeft: '10px', paddingBottom: '10px', fontStyle: 'italic'}}>{randomBeer[0] ? randomBeer[0].brewery : ''}</p>  
          </Paper>
          </Grid>
        </Grid>
        <Button onClick={fetchRandomBeer}>Refresh Beer</Button>
        </>}


      {recommendationsNumber === 5  && recommendedBeers.length > 0 ?
        <Button variant='outlined' style={{marginTop:'15px'}} onClick={() => setRecommendationsNumber(10)}>Show More Beers</Button>  
      : <div></div> }
      
    </div>
  )
}

export default HomePage;