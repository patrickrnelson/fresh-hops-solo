import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Admin() {
  const dispatch = useDispatch();

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
    <div>
      <h2 style={{ display: 'block', marginTop: '45px', marginBottom: '40px', marginLeft: '20px'}}>Admin</h2>
    </div>
    <div style={{textAlign: 'center'}}>
      <h3>Add A New Beer</h3>
      <div style={{width: '80%', textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
        <label> Beer Name
          <input 
            type='text'
            value={newBeerName}
            onChange={(event) =>  setNewBeerName(event.target.value)} />
        </label>
      </div>
      <div style={{width: '80%', textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
        <label> Brewery
          <input 
            type='text'
            value={newBeerBrewery}
            onChange={(event) =>  setNewBeerBrewery(event.target.value)} />
        </label>
      </div>
      <div style={{width: '80%', textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
        <label> Beer Style
          <input 
            type='text'
            value={newBeerType}
            onChange={(event) =>  setNewBeerType(event.target.value)} />
        </label>
      </div>
      <div style={{width: '80%', textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
        <label> Dominant Flavor
          <select
            type="text" 
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
        </label>
      </div>  
      <div style={{width: '90%', textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
        <label> Characteristic One
          <input 
            type='text'
            value={characteristicOne}
            onChange={(event) =>  setCharacteristicOne(event.target.value)} />
        </label>
      </div>
      <div style={{width: '90%', textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
        <label> Characteristic Two
          <input 
            type='text'
            value={characteristicTwo}
            onChange={(event) =>  setCharacteristicTwo(event.target.value)} />
        </label>
      </div>
      <div style={{width: '90%', textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
        <label> Characteristic Three
          <input 
            type='text'
            value={characteristicThree}
            onChange={(event) =>  setCharacteristicThree(event.target.value)} />
        </label>
      </div>
      <button type="submit" onClick={handleSubmit}>Add Beer</button>
    </div>
    </>
  )
}

export default Admin;