import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import './LoginForm.css'

// Material UI imports
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    
    <form className="formPanel" onSubmit={login}>
      <Grid container spacing={0} alignItems='center' style={{display:'flex', flexDirection:'column'}}>
          <img
            style={{
              display: 'block', 
              margin: '30px auto',
            }} 
            src="https://images.creativemarket.com/0.1.0/ps/2889213/600/400/m1/fpnw/wm0/zdqaf6hi0uarrkccaer5wiyxufqblvcuc6lmh8sahffmftdybuzexhckyrvtuts8-.jpg?1498334639&s=29d6a93972e8d8e8cc3f2175c01f42c0" 
            height="110px"
          />
          <h1 id='appName'>Fresh Hops</h1>
      </Grid>
      <h2 className='loginRegisterTitle'>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Grid container spacing={3} alignItems='center' justify='center' >
        <Grid item xs={11}>
          <TextField 
            label="Username" 
            variant="outlined" 
            id="username" 
            fullWidth 
            required
            autoComplete="off"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            />
        </Grid>
        <Grid item xs={11}>
          <TextField
            label="Password" 
            variant="outlined" 
            id="username" 
            fullWidth 
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Grid>
          <Button className="btn" type="submit" name="submit" color="primary" variant="contained">Login</Button>
      </Grid>
    </form>

  );
}

export default LoginForm;
