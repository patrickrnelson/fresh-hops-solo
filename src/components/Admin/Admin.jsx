import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Admin.css'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function Admin() {
  const dispatch = useDispatch();
  const history = useHistory();

  const dominantFlavors = useSelector(store => store.dominantFlavors);

  const [newBeerName, setNewBeerName] = useState('');
  const [newBeerType, setNewBeerType] = useState('');
  const [newBeerBrewery, setNewBeerBrewery] = useState('');

  const [beerDominantFlavor, setBeerDominantFlavor] = useState('');
  const [characteristicOne, setCharacteristicOne] = useState('');
  const [characteristicTwo, setCharacteristicTwo] = useState('');
  const [characteristicThree, setCharacteristicThree] = useState('');

  const handleSubmit = () => {
    dispatch({
      type: 'ADMIN_ADD_BEER',
      payload: {
        name: newBeerName,
        style_name: newBeerType,
        dominant_flavor: beerDominantFlavor,
        brewery_name: newBeerBrewery,
        user_added: false,
        characteristicOne: characteristicOne,
        characteristicTwo: characteristicTwo,
        characteristicThree: characteristicThree
      }
    })
  }

  return (
    <>
      {/* Back Button */}
      <Button style={{margin: '10px'}} onClick={() => history.push('/home')}>Back to Home</Button>

      {/* Page Title */}
      <div className='pageTitle'>
        <h2>Admin</h2>
      </div>

      {/* -- Beer Name Input -- */}
      <div className='formContainer'>
        <h3>Add A New Beer</h3>
        <div className='formField'>
          <label for='beerName'> Beer Name </label>
          <input 
            type='text'
            id='beerName'
            value={newBeerName}
            onChange={(event) =>  setNewBeerName(event.target.value)} />
        </div>

        {/* Brewery name Input */}
        <div className='formField'>
          <label for='breweryName'> Brewery </label>
          <input 
            type='text'
            id='breweryName'
            value={newBeerBrewery}
            onChange={(event) =>  setNewBeerBrewery(event.target.value)} />
        </div>

        {/* Beer Style Input */}
        <div className='formField'>
          <label for='beerStyle'> Beer Style </label>
          <input 
            type='text'
            id='beerStyle'
            value={newBeerType}
            onChange={(event) =>  setNewBeerType(event.target.value)} />
        </div>

        {/* -- Dominant Flavor Dropdown -- */}
        <div className='formField'>
          <label for='dominantFlavor'> Dominant Flavor </label>
          <select
            type="text"
            id='dominantFlavor' 
            value={beerDominantFlavor}
            onChange={(event) => {setBeerDominantFlavor(event.target.value)}}
          >
            <option value="">--Select Flavor--</option>
              {dominantFlavors.map((flavor) => {
                  return (
                    <option key={flavor.id}>{flavor.flavor_name}</option>
                  )
                }
              )}
          </select>
        </div>  

        {/* -- Characteristic One Input -- */}
        <div className='formField'>
          <label for='characteristicOne'> Characteristic One </label>
          <input 
            type='text'
            id='characteristicOne'
            value={characteristicOne}
            onChange={(event) =>  setCharacteristicOne(event.target.value)} />
        </div>

        {/* -- Characteristic Two Input-- */}
        <div className='formField'>
          <label for='characteristicTwo'>Characteristic Two</label> 
          <input 
            type='text'
            id='characteristicTwo'
            value={characteristicTwo}
            onChange={(event) =>  setCharacteristicTwo(event.target.value)} />
        </div>

        {/* -- Characteristic Three Input -- */}
        <div className='formField'>
          <label for='characteristicThree'> Characteristic Three </label>
          <input 
            type='text'
            id='characteristicThree'
            value={characteristicThree}
            onChange={(event) =>  setCharacteristicThree(event.target.value)} />
        </div>
        <Button variant='outlined' type="submit" style={{marginTop: 20}} onClick={handleSubmit}>Add Beer</Button>
      </div>
    </>
  )
}

export default Admin;