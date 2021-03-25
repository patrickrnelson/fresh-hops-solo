import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BackDialog from '../BackDialog/BackDialog'
import Header from '../Header/Header';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
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
    console.log('**History**', history.location.state.from);
    setRenderAdditional(false);
    // button can be 'Delete' or 'Save Beer' depending on where the user navigates from
    if(history.location.state.from === 'home' || history.location.state.from === 'search beers') {
      setButtonText("Add to 'I Want to Try'");
      setButtonColor('primary');
    }
    // if user navigates from a list view, render the tried status
    else if(history.location.state.from === 'my beers' || history.location.state.from === 'want to try') {
      setButtonText('Delete Beer');
      setButtonColor('secondary');
      setRenderAdditional(true);
    }
  }, []); // end useEffect

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
      history.push('/wanttotry')
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
        : <IconButton onClick={() => {history.goBack();}}>
            <ArrowBackIcon /><p>Back</p>
          </IconButton>}
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
      {/* Beer Flavors & Characteristics */}
      <div style={{ display: 'flex', flexDirection:'column', marginTop: '30px', textAlign: 'center' }}>
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
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} >
        {/* If renderAdditional === true, render the Save Changes Button */}
        {renderAdditional ? <Button style={{width: '55%', marginTop: '50px'}} variant={saveChangesBtnVariant} color={saveChangesColor} onClick={updateBeer}>SAVE CHANGES</Button> : <div></div>}
        {/* Button will change depending on where user navigated from */}
        {buttonText === 'Delete Beer' ? <DeleteDialog buttonClick={buttonClick}/>
        : <Button style={{width: '55%', marginTop: '10px'}} color={buttonColor} variant='contained' onClick={buttonClick}>{buttonText}</Button>}
      </div>
    </div>
  )
}

export default BeerDetails;