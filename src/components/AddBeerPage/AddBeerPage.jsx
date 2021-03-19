import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddBeerForm from '../AddBeerForm/AddBeerForm'
import Header from '../Header/Header';

function AddBeerPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  // data from store for drop down menus
  const characteristics = useSelector(store => store.characteristics);
  const dominantFlavors = useSelector(store => store.dominantFlavors);

  // state to track the tried status
  const [triedStatus, setTriedStatus] = useState(false);

  // tracks text inputs
  const [newBeerName, setNewBeerName] = useState('');
  const [newBeerType, setNewBeerType] = useState('');
  const [newBeerBrewery, setNewBeerBrewery] = useState('');

  // tracks the dropdowns for flavor/characteristics
  const [beerDominantFlavor, setBeerDominantFlavor] = useState('');
  const [characteristicOne, setCharacteristicOne] = useState('');
  const [characteristicTwo, setCharacteristicTwo] = useState('');
  const [characteristicThree, setCharacteristicThree] = useState('');

  // Contains the characteristics associated with the current beer type that is selected
  const [typeCharacteristics, setTypeCharacteristics] = useState([]);

  // defines the current like status and button colors
  const [likeStatus, setLikeStatus] = useState(null)
  const [thumbsUpColor, setThumbsUpColor] = useState('inherit')
  const [thumbsDownColor, setThumbsDownColor] = useState('inherit')

  useEffect(() => {
    dispatch({
      type: 'FETCH_CHARACTERISTICS'
    })
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

   // switches the boolean when user toggles the tried switch
  const handleTriedChange = (event) => {
    setTriedStatus(!triedStatus);
  };

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

  // triggered on characteristic dropdown click
  // Sets the typeCharacteristics state to contain characs. 
  // associated with the current beer type that is selected
  const defineTypeCharacteristics = () => {
    characteristics.map((object) => {
      if(object.type == newBeerType) {
        setTypeCharacteristics(object.all_characteristics)
      }
    })
  }

  // bundles all of the state to be ready for DB
  const addBeerClick = () => {
    dispatch({
      type: 'ADD_NEW_BEER',
      payload: {
        name: newBeerName,
        style_name: newBeerType,
        brewery_name: newBeerBrewery,
        flavor: beerDominantFlavor,
        characteristicOne: characteristicOne,
        characteristicTwo: characteristicTwo,
        characteristicThree: characteristicThree,
        triedStatus: triedStatus,
        likeStatus: likeStatus
      }
    })
    history.push('/mybeers')
  } // end addBeerClick

  // test function to make sure my state is capturing what I think it is
  const testerFunction = () => {
    console.log('Tried status', triedStatus);
    console.log('Beer', newBeerName);
    console.log('Type', newBeerType);
    console.log('Brewery', newBeerBrewery);
    console.log('Like Status', likeStatus);
    console.log('characteristicOne', characteristicOne);
    console.log('characteristicTwo', characteristicTwo);
    console.log('characteristicThree', characteristicThree);
    console.log('dominantFlavor', beerDominantFlavor);
  } // end tester function - can get rid of

  return (
    <div>
      <Header />
      <AddBeerForm 
        addBeerClick={addBeerClick}
        beerDominantFlavor={beerDominantFlavor}
        characteristicOne={characteristicOne}
        characteristicTwo={characteristicTwo}
        characteristicThree={characteristicThree}
        defineTypeCharacteristics={defineTypeCharacteristics}
        dislikeClick={dislikeClick}
        dominantFlavors={dominantFlavors}
        handleTriedChange={handleTriedChange}
        likeClick={likeClick}
        newBeerBrewery={newBeerBrewery}
        newBeerName={newBeerName}
        newBeerType={newBeerType}
        setBeerDominantFlavor={setBeerDominantFlavor}
        setCharacteristicOne={setCharacteristicOne}
        setCharacteristicTwo={setCharacteristicTwo}
        setCharacteristicThree={setCharacteristicThree}
        setNewBeerBrewery={setNewBeerBrewery}
        setNewBeerName={setNewBeerName}
        setNewBeerType={setNewBeerType}
        testerFunction={testerFunction}
        thumbsDownColor={thumbsDownColor}
        thumbsUpColor={thumbsUpColor}
        triedStatus={triedStatus}
        typeCharacteristics={typeCharacteristics}
        />
    </div>
  )
}

export default AddBeerPage;