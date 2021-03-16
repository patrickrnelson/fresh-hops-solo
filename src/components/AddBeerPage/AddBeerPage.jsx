import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../Header/Header';

// Material UI imports
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

function AddBeerPage() {
  const dispatch = useDispatch();

  const [newBeerName, setNewBeerName] = useState('');
  const [newBeerType, setNewBeerType] = useState('');
  const [newBeerBrewery, setNewBeerBrewery] = useState('');

  const [likeStatus, setLikeStatus] = useState(null)
  const [thumbsUpColor, setThumbsUpColor] = useState('default')
  const [thumbsDownColor, setThumbsDownColor] = useState('default')

  useEffect(() => {
    dispatchEvent({
      type: 'FETCH_CHARACTERISTICS'
    })
    if(likeStatus === true) {
      setThumbsUpColor('primary')
      setThumbsDownColor('default')
    } else if(likeStatus === false) {
      setThumbsUpColor('default')
      setThumbsDownColor('secondary')
    } else {
      setThumbsUpColor('default')
      setThumbsDownColor('default')
    }
  }, [])

  // If someone clicks 'Thumbs up', set likeStatus to true
  // and set the button colors accordingly
  const likeClick = () => {
    if(likeStatus === null || likeStatus === false) {
      setLikeStatus(true)
      setThumbsUpColor('primary')
      setThumbsDownColor('default')
    } else {
      setLikeStatus(null)
      setThumbsUpColor('default')
      setThumbsDownColor('default')
    }
    
  }

  // If someone clicks 'Thumbs down', set likeStatus to false
  // and set the button colors accordingly
  const dislikeClick = () => {
    if(likeStatus === null || likeStatus === true) {
      setLikeStatus(false)
      setThumbsUpColor('default')
      setThumbsDownColor('secondary')
    } else {
      setLikeStatus(null)
      setThumbsUpColor('default')
      setThumbsDownColor('default')
    }
  }

  const randomButtonClick = () => {
    console.log('Beer', newBeerName);
    console.log('Type', newBeerType);
    console.log('Brewery', newBeerBrewery);
    console.log('Like Status', likeStatus);
  }

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
    {type: 'Pale Ale'}
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
    {name: 'Voyageur'}
  ]);

  return (
    <div>
      <Header />
      <form>
        <h2 style={{ display: 'block', marginTop: '60px', marginBottom: '15px'}}>Add A Beer</h2>
        <Grid container spacing={3} alignItems='center' justify='center' >
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
              onChange={(e,v) => setNewBeerType(v.type)}
              renderInput={(params) => 
                <TextField {...params} label="Beer Type" variant="filled" fullWidth onChange={({ target }) => setNewBeerBrewery(target.value)} />}
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
        </Grid>
        <Button onClick={randomButtonClick}>Click Me!</Button>
      </form>
    </div>
  )
}

export default AddBeerPage;