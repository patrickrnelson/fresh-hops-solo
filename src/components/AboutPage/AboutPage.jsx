import React from 'react';
import { useHistory } from 'react-router-dom';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  const history = useHistory();

  return (
    <div className="container">
      <div>
        <p>Fresh Hops helps you find yummy local beers that fit your taste!</p>
      </div>
      <button onClick={() => {history.goBack();}}>
        Back
      </button>
    </div>
  );
}

export default AboutPage;
