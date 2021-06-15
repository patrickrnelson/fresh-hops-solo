import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BackDialog from '../BackDialog/BackDialog'
import Header from '../Header/Header';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import StatusChangeInputs from '../StatusChangeInputs/StatusChangeInputs';

import './BeerDetails.css'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

function BeerDetails() {
  const history = useHistory();
  const dispatch = useDispatch();

  // beer details from store
  const beerDetails = useSelector(store => store.beerDetails);
  const user = useSelector(store => store.user)

  useEffect(() => {
    console.log('**History**', history.location.state.from);
    setRenderAdditional(false);
    determineTriedStatus();
    determineLikeStatus();
    // button can be 'Delete' or 'Save Beer' depending on where the user navigates from
    if(history.location.state.from === 'home' || history.location.state.from === 'search beers') {
      setButtonText("Add to 'I Want to Try'");
      setButtonColor('primary');
    }
    // if user navigates from a list view, render 'save changes' button
    else if(history.location.state.from === 'my beers' || history.location.state.from === 'want to try') {
      setButtonText('Delete Beer');
      setButtonColor('secondary');
      setRenderAdditional(true);
    }
  }, []); // end useEffect

  // defines what the button should say based on which page the user navigated from
  const [buttonText, setButtonText] = useState();

  // defines the current tried status
  const [triedStatus, setTriedStatus] = useState(null);
  // On load, determine if the user has this beer in their beer list
  // and set the tried status accordingly
  const determineTriedStatus = () => {
    for(let i=0; i < beerDetails.length; i++) {
      if(beerDetails[i].user_id === user.id) {
        setTriedStatus(beerDetails[i].has_tried)
      }
      else{
        setTriedStatus(null)
      }
    }
  }

  // defines the current like status
  const [likeStatus, setLikeStatus] = useState(null)
  // On load, determine if the user has this beer in their beer list
  // and set the like status accordingly
  const determineLikeStatus = () => {
    console.log('user.id', user.id);
    for(let i=0; i < beerDetails.length; i++) {
      console.log('beerDetails.user_id', beerDetails[i].user_id);
      if(beerDetails[i].user_id === user.id) {
        setLikeStatus(beerDetails[i].is_liked)
      }
      else {
        setLikeStatus(null)
      }
    }
  }

  // render additional will render the 'like status', 'tried status', 
  // and 'save changes' button when true
  const [renderAdditional, setRenderAdditional] = useState(false);

  // Used to change the look of the button when a user changes anything that needs to be saved
  const [saveChangesColor, setSaveChangesColor] = useState('inherit');
  const [saveChangesBtnVariant, setSaveChangesBtnVariant] = useState('text');

  // button can be 'Delete' or 'Save Beer' depending on where the user navigates from
  const [buttonColor, setButtonColor] = useState('inherit');

  // Button changes, and depending on what button is, different dispatches occur
  const buttonClick = () => {
    if(buttonText === "Add to 'I Want to Try'" || buttonText === "Add to 'My Beers'") {
      dispatch({
        type: 'SAVE_BEER',
        payload: {
          id: beerDetails[0].beer_id,
          has_tried: triedStatus,
          is_liked: likeStatus
        }
      })
      if(buttonText === "Add to 'I Want to Try'") {
      history.push('/wanttotry')
      } else {
        history.push('/mybeers')
      }
    }
    else if(buttonText === 'Delete Beer') {
      console.log('***DELETE***');
      dispatch({
        type: 'DELETE_A_BEER',
        payload: beerDetails[0].beer_id
      })
      history.goBack();
    }
    
  } // end buttonClick

  // Will update beer status' in the DB if they click Save Changes on this page
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

  const handleBackClick = () => {
    dispatch({
      type: 'CLEAR_BEER_DETAILS'
    })
    history.goBack();
  }

  // After user clicks 'Save Changes' we navigate them to either the my beers page or the want to try page
  // depending on if they have tried the beer or not
  const switchPages = () => {
    triedStatus ? history.push('/mybeers') : history.push('/wanttotry')
  }

  return (
    <div>
      {/* Back button & Hamburger menu */}
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        {saveChangesColor == 'primary' ? <BackDialog /> 
        : <IconButton onClick={handleBackClick}>
            <ArrowBackIcon /><p>Back</p>
          </IconButton>}
        <Header />
      </div>

      {/* Page Title */}
      <div className='pageTitle'>
        <h2 className='beerTitle' style={{ }}>{beerDetails[0].beer}</h2>
      </div>

      {/* Beer Information */}
      <div className='beerInfoDiv' style={{ marginTop: '30px', marginBottom: '15px', marginLeft: '20px'}}>
        <h2>Name</h2>
        <p className="detailsText">{beerDetails[0].beer}</p>

        <h2>Type</h2>
        <p className="detailsText">{beerDetails[0].style_name}</p>

        <h2>Brewery</h2>
        <p className="detailsText">{beerDetails[0].brewery}</p>
      </div>
      {/* Beer Flavors & Characteristics */}
      <div style={{ display: 'flex', flexDirection:'column', marginTop: '30px', textAlign: 'center' }}>
        <h3>Dominant Flavor</h3>
        <p className="detailsText">{beerDetails[0].flavor_name}</p>
        
        <h3>Characteristics</h3>
        <ul>
          {beerDetails[0].array_agg.map((characters) => {
            return (
              <li className="detailsText">
                {characters}
              </li>
            )
          })}
        </ul> 
      </div>
      <Grid container spacing={3} alignItems='center' justify='center' style={{marginTop: '35px'}}>
        <StatusChangeInputs 
          likeStatus={likeStatus}
          setLikeStatus={setLikeStatus}
          triedStatus={triedStatus}
          setButtonText={setButtonText}
          setTriedStatus={setTriedStatus}
          setSaveChangesColor={setSaveChangesColor}
          setSaveChangesBtnVariant={setSaveChangesBtnVariant} />
      </Grid>
      {/* Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} >
        {/* If renderAdditional === true, render the Save Changes Button */}
        {renderAdditional ? <Button style={{width: '55%', marginTop: '50px'}} variant={saveChangesBtnVariant} color={saveChangesColor} onClick={updateBeer}>SAVE CHANGES</Button> : <div></div>}
        {/* Button could be 'Delete' OR 'Add to...' depending on where user navigated from */}
        {buttonText === 'Delete Beer' ? <DeleteDialog buttonClick={buttonClick}/>
        : <Button style={{width: '55%', marginTop: '20px'}} color={buttonColor} variant='contained' onClick={buttonClick}>{buttonText}</Button>}
      </div>
    </div>
  )
}

export default BeerDetails;