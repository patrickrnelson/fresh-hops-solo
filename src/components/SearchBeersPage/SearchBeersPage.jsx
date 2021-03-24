import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';

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
    {type: 'IPA'},
    {type: 'Pilsner'},
    {type: 'Hazy IPA'},
    {type: 'Sour Ale'},
    {type: 'Blonde Ale'},
    {type: 'Stout'},
    {type: 'ESB'},
    {type: 'Smoothie IPA'},
    {type: 'Pastry Stout'},
    {type: 'Smoothie Sour'},
    {type: 'Imperial Stout'},
    {type: 'IPA'},
    {type: 'Fruited Berliner Weise'},
    {type: 'Imperial Smoothie Sour'},
    {type: 'New England DIPA'},
    {type: 'IPA'},
    {type: 'Lager'},
    {type: 'Coffee Lager'},
    {type: 'Fruited Blonde Ale'},
    {type: 'Amber Lager'},
    {type: 'Golden Lager'},
    {type: 'Session IPA'},
    {type: 'Cream Ale'},
    {type: 'Summer Ale'},
    {type: 'Red Ale'},
    {type: 'Kolsch'},
    {type: 'Milkshake IPA'},
    {type: 'Belgian Tripel'},
    {type: 'Brown Ale'},
    {type: 'Belgian'},
    {type: 'Pastry Ale'},
    {type: 'Porter'},
    {type: 'Wheat Ale'},
    {type: 'Imperial Lager'},
    {type: 'Honey Ale'},
    {type: 'Ale'},
    {type: 'Dunkel Lager'},
    {type: 'Barleywine'},
    {type: 'Hazy Pale Ale'},
    {type: 'Table Beer'},
    {type: 'Saison'},
    {type: 'Pale Ale'},
  ]);

  // Data for Autocomplete input
  const [breweries, setBreweries] = useState([ 
    {name: 'Pryes Brewing Co.'},
    {name: 'Indeed Brewing Co.'},
    {name: 'Modist Brewing Co.'},
    {name: 'Fulton Beer'},
    {name: 'Castle Danger Brewing'},
    {name: 'Inbound Brew Co.'},
    {name: 'Dangerous Man Brewing Co.'},
    {name: 'Falling Knife Brewing Co.'},
    {name: 'Able Seedhouse + Brewery'},
    {name: 'Bauhaus Brew Labs'},
    {name: 'Voyageur Brewing Co.'},
    {name: 'Fair State Brewing Cooperative'},
    {name: ''},
  ]);

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
      <IconButton onClick={() => {history.goBack();}}>
        <ArrowBackIcon /><p>Back</p>
      </IconButton>
      <Header />
    </div>
    <h2 style={{ display: 'block', marginTop: '45px', marginBottom: '20px', marginLeft: '20px'}}>Search Beers</h2>

    <Grid container spacing={3} alignItems='center' justify='center' >
      {/* Beer Name input */}
      <Grid item xs={11} style={{display: 'flex', justifyContent: 'center'}}>
        <Autocomplete
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
        />
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
          beer.beer.toLowerCase().includes(beerNameInputValue.toLowerCase()))
        {
          return (
            <Grid key={beer.beer_id} className={classes.root} justify='center' onClick={() => handleBeerClick(beer.beer_id)}>
              <Paper elevation={2}>
                <div style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                  <img src={beer.image} width='80' style={{padding: '15px 10px'}}/>
                  <div style={{width: '80%'}}>
                    <h3 style={{ paddingLeft: '10px', paddingTop: '10px'}}>{beer.beer}</h3>
                    <p style={{ paddingLeft: '10px' }}>{beer.style_name}</p>
                    <p style={{ paddingLeft: '10px', fontStyle: 'italic'}}>{beer.brewery}</p>  
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