import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import StatusChangeInputs from '../StatusChangeInputs/StatusChangeInputs';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

function BeerDetails() {
  const history = useHistory();
  const dispatch = useDispatch();

  // beer details from store
  const beerDetails = useSelector(store => store.beerDetails);

  // defines what the button should say based on which page the user navigated from
  const [buttonText, setButtonText] = useState();

  // defines the current like status
  const [likeStatus, setLikeStatus] = useState(beerDetails[0].is_liked)
  // defines the current tried status
  const [triedStatus, setTriedStatus] = useState(beerDetails[0].has_tried);

  // render additional will render the 'like status', 'tried status', 
  // and 'save changes' button when true
  const [renderAdditional, setRenderAdditional] = useState(false);
  
  // Used to change the look of the button when a user changes anything that needs to be saved
  const [saveChangesColor, setSaveChangesColor] = useState('inherit');
  const [saveChangesBtnVariant, setSaveChangesBtnVariant] = useState('inherit');

  // button can be 'Delete' or 'Save Beer' depending on where the user navigates from
  const [buttonColor, setButtonColor] = useState('inherit');

  useEffect(() => {
    setRenderAdditional(false);
    // button can be 'Delete' or 'Save Beer' depending on where the user navigates from
    if(history.location.state.from === 'home') {
      setButtonText('Save Beer');
      setButtonColor('primary');
    }
    // if user navigates from a list view, render the tried status
    else if(history.location.state.from === 'my beers' || history.location.state.from === 'want to try') {
      setButtonText('Delete');
      setButtonColor('secondary');
      setRenderAdditional(true);
    }
  }, []); // end useEffect

  // Button changes, and depending on what button is, different dispatches occur
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

  // After user clicks 'Save Changes' we navigate them to either the my beers page or the want to try page
  // depending on if they have tried the beer or not
  const switchPages = () => {
    triedStatus ? history.push('/mybeers') : history.push('/wanttotry')
  }

  const testerFunction = () => {
    console.log('likeStatus', likeStatus);
    console.log('triedStatus', triedStatus);
  }

  return (
    <div>
      {/* Back button & Hamburger menu */}
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <IconButton onClick={() => {history.goBack();}}>
          <ArrowBackIcon /><p>Back</p>
        </IconButton>
        <Header />
      </div>

      {/* Page Title */}
      <h2 style={{ display: 'block', marginTop: '60px', marginBottom: '20px', marginLeft: '20px'}}>{beerDetails[0].beer}</h2>

      {/* Beer Information */}
      <div style={{ marginTop: '30px', marginBottom: '15px', marginLeft: '20px'}}>
        <h3>Name</h3>
        <p>{beerDetails[0].beer}</p>

        <h3>Type</h3>
        <p>{beerDetails[0].style_name}</p>

        <h3>Brewery</h3>
        <p>{beerDetails[0].brewery}</p>
      </div>
      {/* if renderAdditional === true, render the status inputs  */}
      {renderAdditional ? 
      <Grid container spacing={3} alignItems='center' justify='center' style={{marginTop: '35px'}}>
        <StatusChangeInputs 
          likeStatus={likeStatus}
          setLikeStatus={setLikeStatus}
          triedStatus={triedStatus}
          setTriedStatus={setTriedStatus}
          setSaveChangesColor={setSaveChangesColor}
          setSaveChangesBtnVariant={setSaveChangesBtnVariant} />
      </Grid>
      : <div></div>
      }
      {/* Beer Flavors & Characteristics */}
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
      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection:'column', textAlign: 'center' }} >
        {/* If renderAdditional === true, render the Save Changes Button */}
        {renderAdditional ? <Button variant={saveChangesBtnVariant} color={saveChangesColor} onClick={updateBeer}>SAVE CHANGES</Button> : <div></div>}
        {/* Button will change depending on where user navigated from */}
        <Button color={buttonColor} onClick={buttonClick}>{buttonText}</Button>
        <Button onClick={testerFunction}>TESTER</Button>
      </div>
    </div>
  )
}

export default BeerDetails;