import React from 'react';
import { RouterProvider } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from './types/generic/user.type';
import generateRoutes from './routes';
import { createSession } from './store/auth.store';
import './App.css';
import { connect } from 'react-redux';

const helmetContext = {};

interface AppComponentProps {
  user: User | null,
}


function AppComponent({
  user,
}: AppComponentProps) {
  return (
    <HelmetProvider context={helmetContext}>
      <RouterProvider router={generateRoutes(user)} />
      <ToastContainer />
    </HelmetProvider>
  );
}

const stp = (state: any) => ({
  user: state.auth
});

const dtp = {
  setUser: createSession
};

const App = connect(stp, dtp)(AppComponent);

export default App;
