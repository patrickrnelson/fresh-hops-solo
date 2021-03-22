import React, { useState } from 'react';

// Material UI imports
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

function AddBeerForm({
  addBeerClick,
  beerDominantFlavor,
  characteristicOne,
  characteristicTwo,
  characteristicThree,
  defineTypeCharacteristics,
  dislikeClick,
  dominantFlavors,
  likeClick,
  haveTriedColor,
  newBeerBrewery,
  newBeerName,
  newBeerType,
  notTriedClick,
  notTriedColor,
  setBeerDominantFlavor,
  setCharacteristicOne,
  setCharacteristicTwo,
  setCharacteristicThree,
  setNewBeerBrewery,
  setNewBeerName,
  setNewBeerType,
  thumbsDownColor,
  thumbsUpColor,
  triedClick,
  triedStatus,
  typeCharacteristics
}) {
  
  // Data for Autocomplete input
  // Move to reducer if there's time
  const [beerTypes, setBeerTypes] = useState([
    {type: 'IPA'},
    {type: 'Pilsner'},
    {type: 'Hazy IPA'},
    {type: 'Sour Ale'},
    {type: 'Blonde Ale'},
    {type: 'Stout'},
    {type: 'ESB'},
    {type: 'Smoothie IPA'},
    {type: 'Pastry Stout'},
    {type: 'Smoothie Sour'},
    {type: 'Imperial Stout'},
    {type: 'IPA'},
    {type: 'Fruited Berliner Weise'},
    {type: 'Imperial Smoothie Sour'},
    {type: 'New England DIPA'},
    {type: 'IPA'},
    {type: 'Lager'},
    {type: 'Coffee Lager'},
    {type: 'Fruited Blonde Ale'},
    {type: 'Amber Lager'},
    {type: 'Golden Lager'},
    {type: 'Session IPA'},
    {type: 'Cream Ale'},
    {type: 'Summer Ale'},
    {type: 'Red Ale'},
    {type: 'Kolsch'},
    {type: 'Milkshake IPA'},
    {type: 'Belgian Tripel'},
    {type: 'Brown Ale'},
    {type: 'Belgian'},
    {type: 'Pastry Ale'},
    {type: 'Porter'},
    {type: 'Wheat Ale'},
    {type: 'Imperial Lager'},
    {type: 'Honey Ale'},
    {type: 'Ale'},
    {type: 'Dunkel Lager'},
    {type: 'Barleywine'},
    {type: 'Hazy Pale Ale'},
    {type: 'Table Beer'},
    {type: 'Saison'},
    {type: 'Pale Ale'},
    {type: ''},
  ]);

  // Data for Autocomplete input
  const [breweries, setBreweries] = useState([ 
    {name: 'Pryes Brewing Co.'},
    {name: 'Indeed Brewing Co.'},
    {name: 'Modist Brewing Co.'},
    {name: 'Fulton Beer'},
    {name: 'Castle Danger Brewing'},
    {name: 'Inbound Brew Co.'},
    {name: 'Dangerous Man Brewing Co.'},
    {name: 'Falling Knife Brewing Co.'},
    {name: 'Able Seedhouse + Brewery'},
    {name: 'Bauhaus Brew Labs'},
    {name: 'Voyageur Brewing Co.'},
    {name: 'Fair State Brewing Cooperative'},
    {name: ''},
  ]);

   // test function to make sure my state is capturing what I think it is
  // const testerFunction = () => {
  //   console.log('Tried status', triedStatus);
  //   console.log('Beer', newBeerName);
  //   console.log('Type', newBeerType);
  //   console.log('Brewery', newBeerBrewery);
  //   console.log('Like Status', likeStatus);
  //   console.log('characteristicOne', characteristicOne);
  //   console.log('characteristicTwo', characteristicTwo);
  //   console.log('characteristicThree', characteristicThree);
  //   console.log('dominantFlavor', beerDominantFlavor);
  // } // end tester function - can get rid of

  return (
    <div>
        <h2 style={{ display: 'block', marginTop: '60px', marginBottom: '20px', marginLeft: '20px'}}>Add A Beer</h2>
        <Grid container spacing={3} alignItems='center' justify='center' >
          {/* Beer Name input */}
          <Grid item xs={10} style={{display: 'flex', justifyContent: 'center'}}>
            <TextField 
              label="Beer Name" 
              variant="filled" 
              id="beer name" 
              fullWidth 
              required
              value={newBeerName}
              onChange={(event) => setNewBeerName(event.target.value)}
              />
          </Grid>
          {/* Beer Type Autocomplete input */}
          <Grid item xs={11} style={{display: 'flex', justifyContent: 'center'}}>
            <Autocomplete
              
              id="combo-box-demo"
              options={beerTypes}
              getOptionLabel={(option) => option.type}
              style={{ width: 300 }}
              inputValue={newBeerType}
              onChange={(event,value) => setNewBeerType(value.type)}
              renderInput={(params) => 
                <TextField {...params} label="Beer Type" variant="filled" fullWidth onChange={({ target }) => setNewBeerType(target.value)} />}
            />
          </Grid>
          {/* Brewery Autocomplete Input */}
          <Grid item xs={11} style={{display: 'flex', justifyContent: 'center'}}>
            <Autocomplete
              id="combo-box-demo"
              options={breweries}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              inputValue={newBeerBrewery}
              onChange={(e,v) => setNewBeerBrewery(v.name)}
              renderInput={(params) => 
                <TextField {...params} label="Brewery"  variant="filled" fullWidth onChange={({ target }) => setNewBeerBrewery(target.value)} />
            }
            />
          </Grid>
          {/* Has Tried indicator */}
          <Grid container direction="column"  alignContent="center" style={{width: '60%'}}>
            <Grid item>
              <p>Have you drank this beer?</p>
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Button onClick={notTriedClick} color={notTriedColor}>NO</Button>
                <Button onClick={triedClick} color={haveTriedColor}>YES</Button>
              </div>
            </Grid>
            {/* Thumb Icons */}
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
          {/* Dominant Flavor input */}
          <Grid container direction="column" spacing={3} alignContent="center" style={{width: '60%', margin: '10px 0px'}}>
          {triedStatus ? 
            <Grid item xs={10} style={{ display: "flex", flexDirection: 'column', justifyContent: "center", textAlign: 'center'}}>
              <p>Dominant Flavor:</p>
              <select
                type="text" 
                value={beerDominantFlavor}
                onChange={(event) => {setBeerDominantFlavor(event.target.value)}}
                onClick={defineTypeCharacteristics}
              >
              <option value="">--Select Flavor--</option>
                {dominantFlavors.map((flavor) => {
                    return (
                      <option key={flavor.id}>{flavor.flavor_name}</option>
                    )
                  }
                )}
              </select>
            </Grid>
            : <div></div>}
          {/* Characteristic 1 dropdown */}
            {triedStatus ?
            <Grid item xs={10} style={{ display: "flex", flexDirection: 'column', justifyContent: "center", textAlign: 'center'}}>
              <p>Characteristics:</p>
              <select
                type="text" 
                value={characteristicOne}
                onChange={(event) => {setCharacteristicOne(event.target.value)}}
                onClick={defineTypeCharacteristics}
              >
              <option value="none">--Characteristic 1--</option>
                {typeCharacteristics.map((items) => {
                    return (
                      <option>{items}</option>
                    )
                  }
                )}
              </select>
            </Grid>
            : <div></div>}
            {/* Characteristic 2 dropdown */}
            {triedStatus ?
            <Grid item xs={10} >
              <select
                type="text" 
                value={characteristicTwo}
                onChange={(event) => {setCharacteristicTwo(event.target.value)}}
                onClick={defineTypeCharacteristics}
              >
              <option value="">--Characteristic 2--</option>
                {typeCharacteristics.map((items) => {
                    return (
                      <option>{items}</option>
                    )
                  }
                )}
              </select>
            </Grid>
            : <div></div>}
            {/* Characteristic 3 dropdown */}
            {triedStatus ?
            <Grid item xs={10} >
              <select
                type="text" 
                value={characteristicThree}
                onChange={(event) => {setCharacteristicThree(event.target.value)}}
                onClick={defineTypeCharacteristics}
              >
              <option value="">--Characteristic 3--</option>
                {typeCharacteristics.map((items) => {
                    return (
                      <option>{items}</option>
                    )
                  }
                )}
              </select>
            </Grid>
            : <div></div>}
            {/* Add Button */}
            <Button color='primary' variant='contained' onClick={addBeerClick} >Add Beer</Button>
          </Grid>
        </Grid>
    </div>
  )
}

export default AddBeerForm;