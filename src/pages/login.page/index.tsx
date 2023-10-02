import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createSession } from '../../store/auth.store';
import { User } from '../../types/generic/user.type';
import moment from "moment";
import { useNavigate } from 'react-router-dom';

function LoginPageComponent({
  setUser
}: any) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Submitted:', { email, password });
    const sampleUser: User = {
      id: "123",
      name: "John Doe",
      email: "john.doe@example.com",
      mobile: "1234567890",
      password: "hashedPassword123",
      role: "user",
      isEmailVerified: true,
      fromReferral: "referrer123",
      referralCode: "userReferralCode",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const userObject = {
      ...sampleUser,
      token: "1234567890",
    };
    setUser(userObject);
    localStorage.setItem('rb.user', JSON.stringify(userObject));
    localStorage.setItem('rb.userSession', JSON.stringify({ session: 'active', lastActive: moment() }));
    navigate('/dashboard')
  };

  return <div className="login-container">
    <div className="container">
      <div className="card">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="switch">Don't have an account? <a href="#">Register here</a></div>
      </div>
    </div>
  </div>
};

const dtp = {
  setUser: createSession
}

export const LoginPage = connect(() => ({}), dtp)(LoginPageComponent);