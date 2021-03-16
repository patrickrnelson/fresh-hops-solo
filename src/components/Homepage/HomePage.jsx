import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './HomePage.css';
// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Drawer from '@material-ui/core/Drawer';

// Material UI styles
const useStyles = makeStyles({
  list: {
    width: "225px",
  }
});

function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // user from store
  const user = useSelector(store => store.user)
  // random beer from store
  const randomBeer = useSelector(store => store.randomBeer)
  // local state for drawer (hamburger menu)
  const [drawer, setDrawer] = useState(false);

  // On load, grab a random beer
  useEffect(() => {
    dispatch({
      type: 'FETCH_RANDOM_BEER'
    })
  }, []);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  // list that appears when hamburger menu is clicked
  const list = (
    <div
      className={classes.list}
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
      role="presentation">
        <IconButton onClick={toggleDrawer}>
          <ArrowBackIcon />
        </IconButton>
        <List>
          <ListItem id="recommendationsLink">Recommendations</ListItem>
          <ListItem id="myBeersLink">My Beers</ListItem>
          <ListItem id="wantToTryLink">Want to Try</ListItem>
        </List>
    </div>
  )

  // LOGOUT on button click
  const handleLogout = () => {
    dispatch ({
      type: 'LOGOUT'
    })
  }

  // ADD A BEER button
  const handleAdd = () => {
    history.push('/newbeer')
  }

  return (
    <div id='pageContainer'>
      {/* Will probably be able to pull header out into it's own component */}
      <header>
        {/* This section handles the hamburger menu and drawer */}
        <IconButton onClick={toggleDrawer}>
          <MenuIcon fontSize="large"/>
        </IconButton>
        <Drawer anchor="left" open={drawer} onClose={toggleDrawer}>
          {list}
        </Drawer>
        
        {/* End drawer section */}

        <Button onClick={handleAdd}> Add Beer </Button>
      </header>

      <h1>Hi, {user.name}!</h1>

      <h2>Random Beer:</h2>
      <div className='beerCards'>
        <img className="randomImage" src ={randomBeer[0] ? randomBeer[0].image : ''} height='180'/>
        <h3>{randomBeer[0] ? randomBeer[0].beer : ''}</h3>
        <p>{randomBeer[0] ? randomBeer[0].style_name : ''}</p>
        <p>{randomBeer[0] ? randomBeer[0].brewery : ''}</p>  
      </div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default HomePage;