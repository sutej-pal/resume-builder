// Header.tsx
import React, { useState } from 'react';
import './header.scss';

const Header: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Your login logic goes here
    // For simplicity, let's toggle the login state
    setLoggedIn((prevLoggedIn) => !prevLoggedIn);
  };

  return (
    <div className="header">
      <div className="logo">Your Logo</div>
      <div className="right-section">
        {isLoggedIn ? (
          <button className="button">Logout</button>
        ) : (
          <>
            <button className="button" onClick={handleLogin}>
              Login
            </button>
            <button className="button">Sign Up</button>
          </>
        )}
        <div className="links-container">
          <a href="/resume-builder" className="link">
            Link 1
          </a>
          <a href="#" className="link">
            Link 2
          </a>
          <a href="#" className="link">
            Link 3
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
