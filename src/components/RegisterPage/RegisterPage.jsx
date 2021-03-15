import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  const aboutPage = () => {
    history.push('/about')
  }

  return (
    <div>
      <button onClick={aboutPage}>About</button>

      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/');
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
