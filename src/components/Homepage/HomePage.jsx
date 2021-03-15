import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(store => store.user)
  const randomBeer = useSelector(store => store.randomBeer)

  // On load, grab a random beer
  useEffect(() => {
    dispatch({
      type: 'FETCH_RANDOM_BEER'
    })
  }, []);

  // LOGOUT on button click
  const handleLogout = () => {
    dispatch ({
      type: 'LOGOUT'
    })
  }

  // ADD A BEER button
  const handleAdd = () => {
    history.push('/newbeer')
  }

  return (
    <div>
      <button onClick={handleAdd}> Add Beer </button>
      <h2>Hi, {user.name}!</h2>
      <p>{randomBeer[0] ? randomBeer[0].name : ''}</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default HomePage;