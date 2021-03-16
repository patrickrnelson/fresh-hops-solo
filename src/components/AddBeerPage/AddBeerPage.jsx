import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Material UI imports
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

function NewBeerPage() {

  const [newBeerName, setNewBeerName] = useState('');
  const [newBeerType, setNewBeerType] = useState('');
  const [newBeerBrewery, setNewBeerBrewery] = useState('');

  return (
    <div>
      <form>
      <h2 style={{ display: 'block', marginTop: '60px', marginBottom: '15px'}}>Add A Beer</h2>
      <Grid container spacing={3} alignItems='center' justify='center' >
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
        <Grid item xs={11}>
        <Autocomplete
          id="combo-box-demo"
          options={breweries}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Beer Type" variant="filled" value={newBeerType onChange={(event) => setNewBeerType(event.target.value)}/>}
        />
            
            
        </Grid>


        </Grid>
      </form>
    </div>
  )
}

export default NewBeerPage;