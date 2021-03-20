import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

function BeerDetails() {
  const history = useHistory();
  const dispatch = useDispatch();

  // beer details from store
  const beerDetails = useSelector(store => store.beerDetails);

  // defines what the button should say based on which page the user navigated from
  const [buttonText, setButtonText] = useState();

  // defines the current like status and button colors
  const [likeStatus, setLikeStatus] = useState(beerDetails[0].is_liked)
  const [thumbsUpColor, setThumbsUpColor] = useState(beerDetails[0].is_liked ? 'primary' : 'inherit')
  const [thumbsDownColor, setThumbsDownColor] = useState(beerDetails[0].is_liked === false ? 'secondary' : 'inherit')

  // render additional will render the 'like status', 'tried status', 
  // and 'save changes' button when true
  const [renderAdditional, setRenderAdditional] = useState(false);
  // defines the current tried status and button colors
  const [triedStatus, setTriedStatus] = useState(false);
  const [haveTriedColor, setHaveTriedColor] = useState(beerDetails[0].has_tried ? 'primary' : 'inherit');
  const [notTriedColor, setNotTriedColor] = useState(beerDetails[0].has_tried === false ? 'secondary' : 'inherit');

  const [saveChangesColor, setSaveChangesColor] = useState('inherit');
  const [saveChangesBtnVariant, setSaveChangesBtnVariant] = useState('inherit');

  const [buttonColor, setButtonColor] = useState('inherit');

  useEffect(() => {
    setRenderAdditional(false);
    if(history.location.state.from === 'home') {
      setButtonText('Save Beer');
      setButtonColor('primary');
    }
    else if(history.location.state.from === 'my beers' || history.location.state.from === 'want to try') {
      setButtonText('Delete');
      setButtonColor('secondary');
      setRenderAdditional(true);
      setTriedStatus(beerDetails[0].has_tried)
    }
  }, []); // end useEffect

  const buttonClick = () => {
    if(buttonText === 'Save Beer') {
      dispatch({
        type: 'SAVE_BEER',
        payload: {id: beerDetails[0].beer_id}
      })
      history.push('/wanttotry')
    }
    else if(buttonText === 'Delete') {
      console.log('***DELETE***');
      dispatch({
        type: 'DELETE_A_BEER',
        payload: beerDetails[0].beer_id
      })
      history.goBack();
    }
    
  } // end buttonClick

  const changeTriedStatus = () => {
    setTriedStatus(!triedStatus)
  }

  // handle tried status changes and colors of inputs
  const triedClick = () => {
    if(triedStatus === null || triedStatus === false) {
      setTriedStatus(true);
      setHaveTriedColor('primary')
      setNotTriedColor('inherit')
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

  // Will update beer status' in the DB if they change on this page
  const updateBeer = () => {
    dispatch({
      type: 'EDIT_BEER_STATUS',
      payload: {
        beer_id: beerDetails[0].beer_id,
        tried_status: triedStatus,
        like_status: likeStatus
      }
    })
    switchPages();
  } // end update beer

  const switchPages = () => {
    triedStatus ? history.push('/mybeers') : history.push('/wanttotry')
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <IconButton onClick={() => {history.goBack();}}>
          <ArrowBackIcon /><p>Back</p>
        </IconButton>
        <Header />
      </div>

      <h2 style={{ display: 'block', marginTop: '60px', marginBottom: '20px', marginLeft: '20px'}}>{beerDetails[0].beer}</h2>
      <div style={{ marginTop: '30px', marginBottom: '15px', marginLeft: '20px'}}>
        
        <h3>Name</h3>
        <p>{beerDetails[0].beer}</p>

        <h3>Type</h3>
        <p>{beerDetails[0].style_name}</p>

        <h3>Brewery</h3>
        <p>{beerDetails[0].brewery}</p>
      </div>
        {/* Tried Status Input */}
        {renderAdditional ? 
        <Grid container spacing={3} alignItems='center' justify='center' style={{marginTop: '35px'}}>
        <Grid container direction="column"  alignContent="center" style={{width: '60%'}}>
          <Grid item>
            <p>Have you drank this beer?</p>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <Button onClick={notTriedClick} color={notTriedColor}>NO</Button>
              <Button onClick={triedClick} color={haveTriedColor}>YES</Button>
            </div>
          </Grid>
          {triedStatus ?
          <Grid item>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <p>Did you like this beer?</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <IconButton onClick={dislikeClick}>
                <ThumbDownAltIcon color={thumbsDownColor}/>
              </IconButton>
              <IconButton onClick={likeClick}>
                <ThumbUpAltIcon color={thumbsUpColor}/>
              </IconButton>
            </div>
          </Grid>
          : <div></div>}
        </Grid>
        </Grid>
        : <div></div>
        }
        
      <div style={{ display: 'flex', flexDirection:'column', marginTop: '30px', marginBottom: '50px', textAlign: 'center' }}>
        <h4>Dominant Flavor</h4>
        <p>{beerDetails[0].flavor_name}</p>
        
        <h4>Characteristics</h4>
        <ul>
          {beerDetails[0].array_agg.map((characters) => {
            return (
              <li>
                {characters}
              </li>
            )
          })}
        </ul>
      </div>
      {/* Add Button */}
      <div style={{ display: 'flex', flexDirection:'column', textAlign: 'center' }} >
        {renderAdditional ? <Button variant={saveChangesBtnVariant} color={saveChangesColor} onClick={updateBeer}>SAVE CHANGES</Button> : <div></div>}
        <Button color={buttonColor} onClick={buttonClick}>{buttonText}</Button>
      </div>
    </div>
  )
}

export default BeerDetails;