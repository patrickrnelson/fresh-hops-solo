import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


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

function WantToTryPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const userBeers = useSelector(store => store.userBeers)
  // on load, don't render
  const [render, setRender] = useState(true)

  useEffect(() => {
    // set a timeout to wait for POST before fetching
    // after timeout, fetch and start render
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
    <h2 style={{ display: 'block', marginTop: '60px', marginBottom: '20px', marginLeft: '20px'}}>Want to Try</h2>
    { render ?
    <div className='listLayout'>
      { userBeers.map((beer) => {
        if(beer.has_tried === false) {
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
          )
        }
      })}
    </div>
    : <CircularProgress />}
    </>
  )
}

export default WantToTryPage;