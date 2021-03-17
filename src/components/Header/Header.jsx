import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

// Material UI styles
const useStyles = makeStyles({
  list: {
    width: "225px",
  },
  
  logOut: { 
    marginTop: '120px', 
    color: 'red'
  }
});

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // local state for drawer (hamburger menu)
  const [drawer, setDrawer] = useState(false);
  
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

   // LOGOUT on button click
  const handleLogout = () => {
    dispatch ({
      type: 'LOGOUT'
    })
  }

  // list that appears when hamburger menu is clicked
  const list = (
    <div style={{ padding: 20 }}>
      <Grid
        container
        spacing={3}
        direction="column"
        justify="left"
        alignItems="left"
        className={classes.list}
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
        role="presentation">
        <Grid item xs={6}>
          <IconButton onClick={toggleDrawer} style={{alignItems: "center"}}>
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <Link id="recommendationsLink" onClick={() => history.push('/')}>Home</Link>
        </Grid>
        <Grid item xs={6}>
          <Link id="myBeersLink" onClick={() => history.push('/mybeers')}>My Beers</Link>
        </Grid>
        <Grid item xs={6}>
          <Link id="wantToTryLink" onClick={() => history.push('/wanttotry')}>Want to Try</Link>
        </Grid>
        <Button onClick={handleLogout} className={classes.logOut}>Log Out</Button>
      </Grid>
    </div>
  ) // end list

  return (
    <div>

      <header style={{ textAlign: 'right', paddingRight: '17px' }}>
        
        {/* This section handles the hamburger menu and drawer */}
        <IconButton onClick={toggleDrawer} >
          <MenuIcon fontSize="large"/>
        </IconButton>
        <Drawer anchor="right" open={drawer} onClose={toggleDrawer}>
          {list}
        </Drawer>
        {/* End drawer section */}
      
      </header>

    </div>
  )
}

export default Header;