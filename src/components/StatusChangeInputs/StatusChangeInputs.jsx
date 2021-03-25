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

  // Changes colors of buttons depending on the beerDetails
  const [thumbsUpColor, setThumbsUpColor] = useState(beerDetails[0].is_liked ? 'primary' : 'inherit')
  const [thumbsDownColor, setThumbsDownColor] = useState(beerDetails[0].is_liked === false ? 'secondary' : 'inherit')
  const [haveTriedColor, setHaveTriedColor] = useState(beerDetails[0].has_tried ? 'primary' : 'inherit');
  const [notTriedColor, setNotTriedColor] = useState(beerDetails[0].has_tried === false ? 'secondary' : 'inherit');

  // handle tried status changes and colors of inputs
  const triedClick = () => {
    if(triedStatus === null || triedStatus === false) {
      setTriedStatus(true);
      setHaveTriedColor('primary')
      setNotTriedColor('inherit')
      setButtonText("Add to 'My Beers'")
    }
    else {
      // reset like status and thumb colors
      setLikeStatus(null);
      setThumbsUpColor('inherit')
      setThumbsDownColor('inherit')
      // set the correct tries status and colors
      setTriedStatus(null)
      setHaveTriedColor('inherit')
      setNotTriedColor('inherit')

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
      setThumbsUpColor('inherit')
      setThumbsDownColor('inherit')
      // set the correct tries status and colors
      setTriedStatus(false);
      setHaveTriedColor('inherit')
      setNotTriedColor('secondary')

      setButtonText("Add to 'I Want to Try'");
    }
    else {
      setTriedStatus(null)
      setHaveTriedColor('inherit')
      setNotTriedColor('inherit')
    }
    // if anything changes, change the save changes button to indicate that the user needs to save
    setSaveChangesColor('primary')
    setSaveChangesBtnVariant('contained')
  } // end notTriedClick

  const likeClick = () => {
    if(likeStatus === null || likeStatus === false) {
      setLikeStatus(true)
      setThumbsUpColor('primary')
      setThumbsDownColor('inherit')
    } else {
      setLikeStatus(null)
      setThumbsUpColor('inherit')
      setThumbsDownColor('inherit')
    }
    // if anything changes, change the save changes button to indicate that the user needs to save
    setSaveChangesColor('primary')
    setSaveChangesBtnVariant('contained')
  } // end likeClick

  const dislikeClick = () => {
    if(likeStatus === null || likeStatus === true) {
      setLikeStatus(false)
      setThumbsUpColor('inherit')
      setThumbsDownColor('secondary')
    } else {
      setLikeStatus(null)
      setThumbsUpColor('inherit')
      setThumbsDownColor('inherit')
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
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <Button onClick={triedClick} color={haveTriedColor}>YES</Button>
          <Button onClick={notTriedClick} color={notTriedColor}>NO</Button>
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
            <ThumbUpAltIcon color={thumbsUpColor}/>
          </IconButton>
          <IconButton onClick={dislikeClick}>
            <ThumbDownAltIcon color={thumbsDownColor}/>
          </IconButton>
        </div>
      </Grid>
      : <div></div> }
    </Grid>
  )
}

export default StatusChangeInputs;