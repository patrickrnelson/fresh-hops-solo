import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

function LoginPage() {
  const history = useHistory();

  const aboutPage = () => {
    history.push('/about')
  }

  return (
    <div>
      
      
      <LoginForm />

      <center style={{alignItems='center', justifyContent: 'center'}}>
        <Button
          variant="contained"
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/register');
          }}
        >
          Register
        </Button>
        <Button style={{display: 'block', marginTop: '100px'}} onClick={aboutPage}>About Our App</Button>
      </center>
    </div>
  );
}

export default LoginPage;
