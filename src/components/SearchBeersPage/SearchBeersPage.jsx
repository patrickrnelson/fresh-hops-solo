import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';
import './SearchBeersPage.css'

import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(40),
      height: theme.spacing(15),
    },
  },
}));

function SearchBeersPage() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const allBeers = useSelector(store => store.allBeers);
  const userBeers = useSelector(store => store.userBeers);
  const breweries = useSelector(store => store.breweries);

  useEffect(() => {
    fetchUserBeers();
  }, []);

  const fetchUserBeers = () => {
    dispatch ({
      type: 'FETCH_USER_BEERS'
    })
  }

  const handleBeerClick = (beerId) => {
    // defines how the details page will render
    let path = 'search beers'
    console.log('beerId', beerId);
    // dispatch to set the beer details reducer
    dispatch({
      type: 'FETCH_BEER_DETAILS',
      payload: beerId
    })
    // set a timer to wait to history.push until reducer is set
    const timer = setTimeout(function() { 
      // loop through to see if the clicked beer is one the user already has
      if(userBeers.length > 0) {
        for(let myBeer of userBeers) {
          // The beer details page renders differently depending on if the user
          // has the clicked beer already in one of their lists
          if(myBeer.beer_id == beerId) {
            path = 'my beers'
          }
        }
      }
      history.push({
        pathname: '/details', 
        state: { from: path }
      });
    }, 400);
    return () => clearTimeout(timer);
  } // end handleBeerClick

  const [beerTypeInputValue, setBeerTypeInputValue] = useState(' ');
  const [breweryInputValue, setBreweryInputValue] = useState('');
  const [beerNameInputValue, setBeerNameInputValue] = useState('');

  const [beerType, setBeerType] = useState(' ');
  const [brewery, setBrewery] = useState('');
  const [beerName, setBeerName] = useState('');

  // const removeDuplicates = () => {
  //   for(let myBeer of userBeers) {
  //     for(let i=0; i < allBeers.length; i++) {
  //       // if a beer in the allBeers list matches a beer in the users list
  //       // remove it
  //       if(allBeers[i].beer_id == myBeer.beer_id) {
  //         allBeers.splice(i, 1)
  //       }
  //     }
  //   }
  // }

  // Data for Autocomplete input
  // Move to reducer if there's time
  const [beerTypes, setBeerTypes] = useState([
    {type: 'Ale'},
    {type: 'Amber Lager'},
    {type: 'Barleywine'},
    {type: 'Belgian Tripel'},
    {type: 'Belgian'},
    {type: 'Blonde Ale'},
    {type: 'Brown Ale'},
    {type: 'Coffee Lager'},
    {type: 'Cream Ale'},
    {type: 'Dunkel Lager'},
    {type: 'ESB'},
    {type: 'Fruited Berliner Weise'},
    {type: 'Fruited Blonde Ale'},
    {type: 'Golden Lager'},
    {type: 'Hazy IPA'},
    {type: 'Hazy Pale Ale'},
    {type: 'Honey Ale'},
    {type: 'Imperial Lager'},
    {type: 'Imperial Smoothie Sour'},
    {type: 'Imperial Stout'},
    {type: 'IPA'},
    {type: 'Kolsch'},
    {type: 'Lager'},
    {type: 'Milkshake IPA'},
    {type: 'New England DIPA'},
    {type: 'Pale Ale'},
    {type: 'Pastry Ale'},
    {type: 'Pastry Stout'},
    {type: 'Pilsner'},
    {type: 'Porter'},
    {type: 'Red Ale'},
    {type: 'Saison'},
    {type: 'Session IPA'},
    {type: 'Smoothie IPA'},
    {type: 'Smoothie Sour'},
    {type: 'Sour Ale'},
    {type: 'Stout'},
    {type: 'Summer Ale'},
    {type: 'Table Beer'},
    {type: 'Wheat Ale'},
  ]);

  return (
    <>
    <Header />
    <div className='pageTitle'>
      <h2>Search Beers</h2>
    </div>

    <Grid container spacing={3} alignItems='center' justify='center' >
      {/* Beer Name input */}
      <Grid item xs={10} style={{display: 'flex', justifyContent: 'center'}}>
        <TextField 
          label="Beer Name" 
          variant="filled" 
          id="beer name" 
          required
          style={{ width: 300 }}
          autoComplete="off"
          value={beerName}
          onChange={(event) => setBeerName(event.target.value)}
        />
        {/* <Autocomplete
          value={beerName}
          onChange={(event, newValue) => {setBeerName(newValue)}}
          inputValue={beerNameInputValue}
          onInputChange={(event, newInputValue) => {
            setBeerNameInputValue(newInputValue);
          }}
          id="combo-box-demo"
          options={allBeers}
          getOptionLabel={(option) => option.beer ? option.beer : ''}
          style={{ width: 300 }}
          renderInput={(params) => 
            <TextField {...params} label="Beer Name" variant="filled" fullWidth />}
        /> */}
      </Grid>
      
      {/* Brewery Autocomplete Input */}
      <Grid item xs={11} style={{display: 'flex', justifyContent: 'center'}}>
        <Autocomplete
          id="combo-box-demo"
          options={breweries}
          //getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name ? option.name : ''}
          style={{ width: 300 }}
          inputValue={breweryInputValue}
          onInputChange={(event, newInputValue) => {
            setBreweryInputValue(newInputValue);
          }}
          value={brewery}
          onChange={(event, newValue) => {setBrewery(newValue)}}
          renderInput={(params) => 
            <TextField {...params} label="Brewery" variant="filled" fullWidth />
        }
        />
      </Grid>

      {/* Beer Type Autocomplete input */}
      <Grid item xs={11} style={{display: 'flex', justifyContent: 'center'}}>
        <Autocomplete
          value={beerType}
          onChange={(event, newValue) => {setBeerType(newValue)}}
          inputValue={beerTypeInputValue}
          onInputChange={(event, newInputValue) => {
            setBeerTypeInputValue(newInputValue);
          }}
          id="combo-box-demo"
          options={beerTypes}
          getOptionLabel={(option) => option.type ? option.type : ''}
          style={{ width: 300 }}
          renderInput={(params) => 
            <TextField {...params} label="Beer Style" variant="filled" fullWidth />}
        />
      </Grid>
    </Grid>
  
    {/* if(beer.name .includes(beerSearchName)) */}

    <div className='listLayout'>
      { allBeers.map((beer) => {
        if(
          beer.style_name.toLowerCase().includes(beerTypeInputValue.toLowerCase()) && 
          beer.brewery.toLowerCase().includes(breweryInputValue.toLowerCase()) && 
          beer.beer.toLowerCase().includes(beerName.toLowerCase()))
        {
          return (
            <Grid key={beer.beer_id} className={classes.root} justify='center' onClick={() => handleBeerClick(beer.beer_id)}>
              <Paper elevation={2} height='100%'>
                <div style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                  <img src={beer.image} alt={beer.image_desc} style={{padding: '15px 10px', maxHeight: '80px', maxWidth: '80px'}}/>
                  <div style={{width: '80%'}}>
                    <h3 style={{ fontSize: '19px', paddingLeft: '10px', paddingTop: '10px'}}>{beer.beer}</h3>
                    <p style={{ fontSize: '15px', paddingLeft: '10px' }}>{beer.style_name}</p>
                    <p style={{ fontSize: '14px', paddingLeft: '10px', fontStyle: 'italic'}}>{beer.brewery}</p>  
                  </div>
                </div>
              </Paper>
            </Grid>
          )}
      })}
    </div>
    </>
  )
}

export default SearchBeersPage;