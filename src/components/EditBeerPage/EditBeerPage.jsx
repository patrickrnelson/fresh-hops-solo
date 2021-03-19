import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';

import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

function EditBeerPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  // data from store for drop down menus
  const characteristics = useSelector(store => store.characteristics);
  const dominantFlavors = useSelector(store => store.dominantFlavors);
  // beer details from store
  const beerDetails = useSelector(store => store.beerDetails);

  // state to track the tried status
  const [triedStatus, setTriedStatus] = useState(beerDetails[0].has_tried);

  // switches the boolean when user toggles the tried switch
  const handleTriedChange = (event) => {
    setTriedStatus(!triedStatus);
  };

  // tracks text inputs
  const [editBeerName, setEditBeerName] = useState(beerDetails[0].beer);
  const [beerType, setBeerType] = useState(beerDetails[0].style_name);
  const [beerBrewery, setBeerBrewery] = useState(beerDetails[0].brewery);

  // tracks the dropdowns for flavor/characteristics
  const [beerDominantFlavor, setBeerDominantFlavor] = useState(beerDetails[0].flavor_name);
  const [characteristicOne, setCharacteristicOne] = useState(beerDetails[0].array_agg[0]);
  const [characteristicTwo, setCharacteristicTwo] = useState(beerDetails[0].array_agg[1]);
  const [characteristicThree, setCharacteristicThree] = useState(beerDetails[0].array_agg[2]);

  // defines the current like status and button colors
  const [likeStatus, setLikeStatus] = useState(beerDetails[0].is_liked)
  const [thumbsUpColor, setThumbsUpColor] = useState('inherit')
  const [thumbsDownColor, setThumbsDownColor] = useState('inherit')

  useEffect(() => {
    // correctly colors the thumb buttons on load
    if(likeStatus === true) {
      setThumbsUpColor('primary')
      setThumbsDownColor('inherit')
    } else if(likeStatus === false) {
      setThumbsUpColor('inherit')
      setThumbsDownColor('secondary')
    } else {
      setThumbsUpColor('inherit')
      setThumbsDownColor('inherit')
    }
  }, []) // end useEffect

  // If someone clicks 'Thumbs up', set likeStatus to true
  // and set the thumb button colors accordingly
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
  } // end likeClick

  // If someone clicks 'Thumbs down', set likeStatus to false
  // and set the thumb button colors accordingly
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
  } // end dislikeClick

  const saveChanges = () => {
    console.log('In save changes');
    dispatch({
      type: 'EDIT_USER_BEER',
      payload: {
        beer_id: beerDetails[0].beer_id,
        tried_status: triedStatus,
        like_status: likeStatus,
        beer_name: editBeerName
      }
    })
  }

  const testerFunction = () => {
    console.log('Tried status', triedStatus);
    console.log('Beer', editBeerName);
    console.log('Type', beerType);
    console.log('Brewery', beerBrewery);
    console.log('Like Status', likeStatus);
    console.log('characteristicOne', characteristicOne);
    console.log('characteristicTwo', characteristicTwo);
    console.log('characteristicThree', characteristicThree);
    console.log('dominantFlavor', beerDominantFlavor);
  } // end tester function - can get rid of

  return (
    <>
    <Header />
    <div>
      <form>
        <h2 style={{ display: 'block', marginTop: '60px', marginBottom: '15px'}}>Edit Beer</h2>
        <Grid container spacing={3} alignItems='center' justify='center' >
          {/* Has Tried indicator */}
          <FormControlLabel
            control={
              <Switch
                checked={triedStatus}
                onChange={handleTriedChange}
                name="tried"
                color="primary"
              />
            }
            label="Tried It"
          />
          {/* Beer Name input */}
          <Grid item xs={11}>
            <TextField 
              label="Beer Name" 
              variant="filled" 
              id="beer name" 
              fullWidth 
              required
              value={editBeerName}
              onChange={(event) => setEditBeerName(event.target.value)}
              />
          </Grid>

          <Grid>
            <h3>Type</h3>
            <p>{beerDetails[0].style_name}</p>
          </Grid>

          <Grid>
            <h3>Brewery</h3>
            <p>{beerDetails[0].brewery}</p>
          </Grid>
          {/* Thumb Icons */}
          <Grid>
            <IconButton onClick={likeClick}>
              <ThumbUpAltIcon color={thumbsUpColor}/>
            </IconButton>
            <IconButton onClick={dislikeClick}>
              <ThumbDownAltIcon color={thumbsDownColor}/>
            </IconButton>
          </Grid>

          {/* Dominant Flavors */}
          <div style={{ marginTop: '30px', marginBottom: '50px', textAlign: 'center' }}>
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
        </Grid>
        {/* Add Button */}
        <Button onClick={testerFunction}>TESTER</Button>
        <Button onClick={saveChanges} >Save Changes</Button>
      </form>
    </div>
    </>
  )
}

export default EditBeerPage;