import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(40),
      height: theme.spacing(35),
    },
  },
}));

function MyBeersPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const userBeers = useSelector(store => store.userBeers)

  useLayoutEffect(() => {
    const timer = setTimeout(function() { 
      dispatch({
        type: 'FETCH_USER_BEERS'
      })
    }, 300);
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
        state: { from: 'my beers' }
      });
    }, 300);
    return () => clearTimeout(timer);
  } // end handleBeerClick

  return(
    <>
    <Header />
    <h2 style={{ display: 'block', marginTop: '60px', marginBottom: '20px', marginLeft: '20px'}}>My Beers</h2>
    <div className='listLayout'>
      {userBeers.map((beer) => {
        if(beer.has_tried === true) {
          return (
            <Grid container key={beer.beer_id} className={classes.root} justify='center' onClick={() => handleBeerClick(beer.beer_id)} >
              <Paper elevation={3} style={{paddingTop:'5px'}}>
                <img className="randomImage" src={beer.image} height='180'/>
                <div style={{display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <div style={{width: '80%'}}>
                    <h3 style={{ paddingLeft: '10px', paddingTop: '10px'}}>{beer.beer}</h3>
                    <p style={{ paddingLeft: '10px' }}>{beer.style_name}</p>
                    <p style={{ paddingLeft: '10px', fontStyle: 'italic'}}>{beer.brewery}</p> 
                  </div>
                  <div style={{paddingRight: '25px', paddingTop: '20px'}}>
                    {beer.is_liked === true || beer.is_liked === null ? <ThumbUpAltIcon color={beer.is_liked ? 'primary' : 'initial'}/> : <ThumbDownAltIcon color='secondary'/>}
                  </div>  
                </div>
              </Paper>
            </Grid>
          )
        }
      })}
    </div>
    </>
  )
}

export default MyBeersPage;