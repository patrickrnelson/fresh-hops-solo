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
  handleTriedChange,
  likeClick,
  newBeerBrewery,
  newBeerName,
  newBeerType,
  setBeerDominantFlavor,
  setCharacteristicOne,
  setCharacteristicTwo,
  setCharacteristicThree,
  setNewBeerBrewery,
  setNewBeerName,
  setNewBeerType,
  testerFunction,
  thumbsDownColor,
  thumbsUpColor,
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
    {name: 'Falling Knife'},
    {name: 'Able'},
    {name: 'Bauhaus'},
    {name: 'Voyageur'},
    {name: ''},
  ]);

  return (
    <div>
      <form>
        <h2 style={{ display: 'block', marginTop: '60px', marginBottom: '15px'}}>Add A Beer</h2>
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
              value={newBeerName}
              onChange={(event) => setNewBeerName(event.target.value)}
              />
          </Grid>
          {/* Beer Type Autocomplete input */}
          <Grid item xs={11}>
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
          <Grid item xs={11}>
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
          {/* Thumb Icons */}
          <Grid>
            <IconButton onClick={likeClick}>
              <ThumbUpAltIcon color={thumbsUpColor}/>
            </IconButton>
            <IconButton onClick={dislikeClick}>
              <ThumbDownAltIcon color={thumbsDownColor}/>
            </IconButton>
          </Grid>

          {/* Dominant Flavor input */}
          <Grid item xs={10} >
              <select
                type="text" 
                value={beerDominantFlavor}
                onChange={(event) => {setBeerDominantFlavor(event.target.value)}}
                onClick={defineTypeCharacteristics}
              >
              <option value="">--Select a Characteristic--</option>
                {dominantFlavors.map((flavor) => {
                    return (
                      <option key={flavor.id}>{flavor.flavor_name}</option>
                    )
                  }
                )}
              </select>
            </Grid>

          {/* Characteristic 1 dropdown */}
            <Grid item xs={10} >
              <select
                type="text" 
                value={characteristicOne}
                onChange={(event) => {setCharacteristicOne(event.target.value)}}
                onClick={defineTypeCharacteristics}
              >
              <option value="">--Select a Characteristic--</option>
                {typeCharacteristics.map((items) => {
                    return (
                      <option>{items}</option>
                    )
                  }
                )}
              </select>
            </Grid>
            {/* Characteristic 2 dropdown */}
            <Grid item xs={10} >
              <select
                type="text" 
                value={characteristicTwo}
                onChange={(event) => {setCharacteristicTwo(event.target.value)}}
                onClick={defineTypeCharacteristics}
              >
              <option value="">--Select a Characteristic--</option>
                {typeCharacteristics.map((items) => {
                    return (
                      <option>{items}</option>
                    )
                  }
                )}
              </select>
            </Grid>
            {/* Characteristic 3 dropdown */}
            <Grid item xs={10} >
              <select
                type="text" 
                value={characteristicThree}
                onChange={(event) => {setCharacteristicThree(event.target.value)}}
                onClick={defineTypeCharacteristics}
              >
              <option value="">--Select a Characteristic--</option>
                {typeCharacteristics.map((items) => {
                    return (
                      <option>{items}</option>
                    )
                  }
                )}
              </select>
            </Grid>
        </Grid>
        {/* Add Button */}
        <Button onClick={testerFunction}>TESTER</Button>
        <Button onClick={addBeerClick} >Add Beer</Button>
      </form>
    </div>
  )
}

export default AddBeerForm;