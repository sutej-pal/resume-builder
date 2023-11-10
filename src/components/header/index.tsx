// Header.tsx
import React, { useState } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import LinkButton from '../LinkButton';
import { LoginModal } from '../../pages/login.page';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    // Your login logic goes here
    // For simplicity, let's toggle the login state
    // setLoggedIn((prevLoggedIn) => !prevLoggedIn);
  };

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          {/* TODO: Add Logo */}
        </a>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to={'/dashboard'} className="nav-link px-2 link-secondary">Home</Link>
          </li>
          {/* <li>
            <a href="#" className="nav-link px-2 link-dark">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2 link-dark">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2 link-dark">
              FAQs
            </a>
          </li> */}
          <li>
            <Link to={'/about'} className="nav-link px-2 link-dark">
              About
            </Link>
          </li>
        </ul>
        <div className="col-md-3 text-end">
          <button onClick={() => setShowLoginModal(true)} className='btn btn-outline-primary me-2'>
            Login
          </button>
          <LoginModal show={showLoginModal} hide={() => setShowLoginModal(false)} />
          <button type="button" className="btn btn-primary">
            Sign-up
          </button>
        </div>
      </header >
    </div >
  );
};

export default Header;
