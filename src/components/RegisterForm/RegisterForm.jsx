import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI imports
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        name: name
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser} style={{marginTop: '80px'}}>
      <h2 class='loginRegisterTitle'>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Grid container spacing={3} alignItems='center' justify='center' >

        {/* First Name input */}
        <Grid item xs={11}>
          <TextField 
            label="First Name" 
            variant="outlined" 
            id="name" 
            fullWidth 
            type="text"
            name="name"
            required
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
            />
        </Grid>

        {/* Username input */}
        <Grid item xs={11}>
          <TextField
            label="Username" 
            variant="outlined" 
            id="username" 
            fullWidth 
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </Grid>

        {/* Password input */}
        <Grid item xs={11}>
          <TextField
            label="Password" 
            variant="outlined" 
            id="username" 
            fullWidth 
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Grid>

        <Button className="btn" type="submit" name="submit" color="primary" variant="contained">Register</Button>
      </Grid>
    </form>
  );
}

export default RegisterForm;
