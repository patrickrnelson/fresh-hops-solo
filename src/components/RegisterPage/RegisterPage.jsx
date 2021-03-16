import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Button from '@material-ui/core/Button';

function RegisterPage() {
  const history = useHistory();

  const aboutPage = () => {
    history.push('/about')
  }

  return (
    <div>
      <RegisterForm />

      <center>
        <Button
          type="button"
          variant="contained"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/');
          }}
        >
          Login
        </Button>
        <Button style={{display: 'block', marginTop: '100px'}} onClick={aboutPage}>About Our App</Button>
      </center>
    </div>
  );
}

export default RegisterPage;
