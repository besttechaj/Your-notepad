import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const handleChange = (e) => {
    //fetching the value and name from the input
    const value = e.target.value;
    const name = e.target.name;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //destructuring
    //i.e. const name=credentials.name;
    //const email=credentials.email;
    //const password=credentials.password;
    //const cpassword=credentials.cpassword
    const { name, email, password, cpassword } = credentials;

    //testing the api
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json(); //extracting success and authtoken
    console.log(json); //extracting success and authtoken
    //to redirect the user to homepage, we have added success variable at backend and we are fetching it here so if it is true then redirect the user to home page else display error message
    if (json.success) {
      //save the auth-token and re-direct the user to its homepage
      //setItem will take 2 values ..variable name and its value
      localStorage.setItem('token', json.authtoken);

      //redirecting user using useNavigate Hook
      navigate('/');
      props.showAlert('success', 'Your account has been created successfully');
    } else {
      props.showAlert('danger', 'invalid credentials');
    }
  };

  return (
    <div className='container my-3'>
      <form onSubmit={handleSubmit}>
        <h3 style={{ color: 'red' }}>SignUp</h3>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            onChange={handleChange}
            aria-describedby='emailHelp'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            className='form-control'
            type='email'
            id='email'
            name='email'
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
            onChange={handleChange}
            minLength={2}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='cpassword' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            className='form-control'
            id='cpassword'
            name='cpassword'
            onChange={handleChange}
            minLength={2}
            required
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
