import AddBeerPage from '../AddBeerPage/AddBeerPage'
import React, { useState } from 'react';

function AutoCompleteData() {

  

  const [breweries, setBreweries] = useState([ 
    {name: 'Pryes'},
    {name: 'Indeed'},
    {name: 'Modist'},
    {name: 'Fulton'},
    {name: 'Castle Danger'},
    {name: 'Inbound'},
    {name: 'Dangerous Man'},
    {name: 'Falling Knife'},
    {name: 'Able'},
    {name: 'Bauhaus'}
  ]);

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

  return (
    <div>
      <AddBeerPage breweries={breweries} beerTypes={beerTypes} />
    </div>
  )
}

export default AutoCompleteData;