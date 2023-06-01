import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Navbar = () => {
  //storing useLocation inside another variable for further use
  let location = useLocation();
  let navigate = useNavigate;
  useEffect(() => {
    // console.log(location);
  }, [location]);

  //logging out user
  const handleLogout = () => {
    //remove the token
    localStorage.removeItem('token');
    //redirect user
    navigate('/login');
  };

  return (
    <nav
      className='navbar navbar-expand-lg bg-body-tertiary sticky-top'
      data-bs-theme='dark'
      style={{ height: '60px' }}
    >
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/' style={{ color: 'red' }}>
          Your_Notebook
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                className={`nav-link ${
                  location.pathname === '/' ? 'active' : ''
                }`}
                aria-current='page'
                to='/'
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ${
                  location.pathname === '/about' ? 'active' : ''
                }`}
                to='/about'
              >
                About
              </Link>
            </li>
            <li
              className={`nav-link ${
                location.pathname === '/contact' ? 'active' : ''
              }`}
            >
              <Link className='nav-link' to='/contact'>
                Contact
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? (
            <form className='d-flex'>
              <Link
                to='/login'
                className='btn btn-primary btn-sm mx-1'
                role='button'
              >
                Login
              </Link>
              <Link
                to='/signup'
                className='btn btn-primary btn-sm mx-1'
                role='button'
              >
                SignUp
              </Link>
            </form>
          ) : (
            <Link
              to='/login'
              className='btn btn-primary btn-sm'
              role='button'
              onClick={handleLogout}
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
