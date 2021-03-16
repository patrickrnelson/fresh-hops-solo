import React, { useEffect, useState } from 'react';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

// Material UI styles
const useStyles = makeStyles({
  list: {
    width: "225px",
  }
});

function Header() {
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
        spacing={2}
        direction="column"
        justify="left"
        alignItems="left"
        className={classes.list}
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
        role="presentation">
        <Grid item xs={6}>
          <IconButton onClick={toggleDrawer}>
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <Link id="recommendationsLink">Recommendations</Link>
        </Grid>
        <Grid item xs={6}>
          <Link id="myBeersLink" onClick={() => history.push('/mybeers')}>My Beers</Link>
        </Grid>
        <Grid item xs={6}>
          <Link id="wantToTryLink" onClick={() => history.push('/wanttotry')}>Want to Try</Link>
        </Grid>
        <Button onClick={handleLogout}>Log Out</Button>
      </Grid>
    </div>
  ) // end list

  return (
    <div>
      {/* Will probably be able to pull header out into it's own component */}
      <header style={{ textAlign: 'right', paddingRight: '17px' }}>
        {/* This section handles the hamburger menu and drawer */}
        <IconButton onClick={toggleDrawer} >
          <MenuIcon fontSize="large"/>
        </IconButton>
        <Drawer anchor="left" open={drawer} onClose={toggleDrawer}>
          {list}
        </Drawer>
        {/* End drawer section */}
      </header>
    </div>
  )
}

export default Header;