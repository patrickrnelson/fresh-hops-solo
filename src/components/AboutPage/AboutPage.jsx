import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  const history = useHistory();

  return (
    <>
      <h1 style={{ display: 'block', marginTop: '45px', marginBottom: '20px', marginLeft: '20px'}}>My Beers</h1>
      <div className="container" style={{justifyContent: 'center', alignItems: 'center', textAlign:'center', marginTop: '20px'}}>
        <div>
          <p> Fresh Hops helps you find yummy local beers that fit your taste. You love beer, Fresh Hops loves beer, this is where the magic happens.</p>
        </div>
        <Button style={{marginTop: '20px'}} onClick={() => {history.goBack();}}>
          Back to Login
        </Button>
      </div>
    </>
  );
}

export default AboutPage;
