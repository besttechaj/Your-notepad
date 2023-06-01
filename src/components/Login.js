import React, { useState } from 'react';
//importing useNavigate to redirect the user
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
  //using props via destructuring
  const { showAlert } = props;

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    //fetching the value and name from the input
    const value = e.target.value;
    const name = e.target.name;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //testing the api
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    let json = await response.json(); //extracting success and authToken

    console.log(json); //extracting success and authToken
    //to redirect the user to homepage, we have added success variable at backend and we are fetching it here so if it is true then redirect the user to home page else display error message
    if (json.success) {
      //save the auth-token and re-direct the user to its homepage
      //setItem will take 2 values ..variable name and its value
      localStorage.setItem('token', json.authToken);

      //using props via destructuring
      showAlert('success', 'Logged-in successful');
      //redirecting user using useNavigate Hook
      navigate('/');
    } else {
      //using props via destructuring
      showAlert('danger', 'Logged-in Unsuccessful due to invalid credentials');
    }
  };

  return (
    <div className='container my-3'>
      <form onSubmit={handleSubmit}>
        <h3 style={{ color: 'red' }}>Login</h3>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={credentials.email}
            onChange={handleChange}
            aria-describedby='emailHelp'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={credentials.password}
            onChange={handleChange}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
