import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header'

import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

  const [renderAdditional, setRenderAdditional] = useState(false);
  const [triedStatus, setTriedStatus] = useState(false);

  useEffect(() => {
    setRenderAdditional(false);
    if(history.location.state.from === 'home') {
      setButtonText('Save Beer');
    }
    else if(history.location.state.from === 'my beers' || history.location.state.from === 'want to try') {
      setButtonText('Delete');
      setRenderAdditional(true);
      setTriedStatus(beerDetails[0].has_tried)
    }
  }, []); // end useEffect

  // const setThumbColor = () => {
  //   console.log('beerDetails', beerDetails);
  //   if(beerDetails[0].is_liked === true) {
  //     setThumbsUpColor('primary')
  //     setThumbsDownColor('inherit')
  //   } else if(beerDetails[0].is_liked === false) {
  //     setThumbsUpColor('inherit')
  //     setThumbsDownColor('secondary')
  //   } else {
  //     setThumbsUpColor('inherit')
  //     setThumbsDownColor('inherit')
  //   }
  // }

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

  return (
    <div>
      <button onClick={() => {history.goBack();}}>Back</button>
      <button onClick={() => {history.push(EditBeer({state: {beerId}}));}}>Edit</button>
      <Header />
      
      <h2 style={{ display: 'block', marginTop: '60px', marginBottom: '15px'}}>{beerDetails[0].beer}</h2>
        <div style={{ marginTop: '30px', marginBottom: '15px', marginLeft: '20px'}}>
          <div>
          {renderAdditional ? 
            <FormControlLabel
              control={
                <Switch
                  checked={triedStatus}
                  disabled
                  name="tried"
                  color="primary"
                label="Tried It"
                />
              }
            />
          : <div></div>
          }
          </div>
          <h3>Name</h3>
          <p>{beerDetails[0].beer}</p>

          <h3>Type</h3>
          <p>{beerDetails[0].style_name}</p>

          <h3>Brewery</h3>
          <p>{beerDetails[0].brewery}</p>
        </div>
        {renderAdditional ?
          <div>
            <IconButton >
              <ThumbUpAltIcon color={beerDetails[0].is_liked ? 'primary' : 'inherit'}/>
            </IconButton>
            <IconButton >
              <ThumbDownAltIcon color={beerDetails[0].is_liked === false ? 'secondary' : 'inherit'}/>
            </IconButton>
          </div>
        : <div></div>
        } 

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
        {/* Add Button */}
        <Button style={{ marginLeft: '140px'}} onClick={buttonClick}>{buttonText}</Button>
    </div>
  )
}

export default BeerDetails;