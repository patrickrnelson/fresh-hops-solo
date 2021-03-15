import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  const aboutPage = () => {
    history.push('/about')
  }

  return (
    <div>
      <button onClick={aboutPage}>About</button>
      
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/register');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
