import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

function StatusChangeInputs({
  likeStatus, 
  setLikeStatus, 
  triedStatus, 
  setButtonText,
  setTriedStatus, 
  setSaveChangesColor, 
  setSaveChangesBtnVariant}) {

  // beer details from store
  const beerDetails = useSelector(store => store.beerDetails);

  // handle tried status changes and colors of inputs
  const triedClick = () => {
    if(triedStatus === null || triedStatus === false) {
      setTriedStatus(true);
      setButtonText("Add to 'My Beers'")
    }
    else {
      // reset like status and thumb colors
      setLikeStatus(null);
      // set the correct tries status and colors
      setTriedStatus(null)
    }
    // if anything changes, change the save changes button to indicate that the user needs to save
    setSaveChangesColor('primary')
    setSaveChangesBtnVariant('contained')
  } // end triedClick

  // handle tried status changes and colors of inputs
  const notTriedClick = () => {
    if(triedStatus === null || triedStatus === true) {
      // reset like status and thumb colors
      setLikeStatus(null);
      setTriedStatus(false);
      setButtonText("Add to 'I Want to Try'");
    }
    else {
      setTriedStatus(null)
    }
    // if anything changes, change the save changes button to indicate that the user needs to save
    setSaveChangesColor('primary')
    setSaveChangesBtnVariant('contained')
  } // end notTriedClick

  const likeClick = () => {
    if(likeStatus === null || likeStatus === false) {
      setLikeStatus(true)
    } else {
      setLikeStatus(null)
    }
    // if anything changes, change the save changes button to indicate that the user needs to save
    setSaveChangesColor('primary')
    setSaveChangesBtnVariant('contained')
  } // end likeClick

  const dislikeClick = () => {
    if(likeStatus === null || likeStatus === true) {
      setLikeStatus(false)
    } else {
      setLikeStatus(null)
    }
    // if anything changes, change the save changes button to indicate that the user needs to save
    setSaveChangesColor('primary')
    setSaveChangesBtnVariant('contained')
  } // end dislikeClick

  return (
    <Grid container direction="column"  alignContent="center" style={{width: '60%'}}>
      {/* Tried Status Inputs */}
      <Grid item>
        <p>Have you drank this beer?</p>
        <div className='triedButtons'>
          <Button size="small" variant={triedStatus ? 'contained' : 'outlined'}  onClick={triedClick} color={triedStatus ? 'primary' : 'inherit'}>YES</Button>
          <Button size="small" variant={triedStatus === false ? 'contained' : 'outlined'} onClick={notTriedClick} color={triedStatus === false ? 'secondary' : 'inherit'}>NO</Button>
        </div>
      </Grid>
      {/* If the user has tried the beer, allow them to say if they liked it */}
      {triedStatus ?
      <Grid item>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <p>Did you like this beer?</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <IconButton onClick={likeClick}>
            <ThumbUpAltIcon fontSize="large" color={likeStatus ? 'primary' : 'inherit'}/>
          </IconButton>
          <IconButton onClick={dislikeClick}>
            <ThumbDownAltIcon fontSize="large" color={likeStatus === false ? 'secondary' : 'inherit'}/>
          </IconButton>
        </div>
      </Grid>
      : <div></div> }
    </Grid>
  )
}

export default StatusChangeInputs;