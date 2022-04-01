import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./bootstrap.min.css";
import 'react-responsive-modal/styles.css';
import { UserProvider } from './context/UserContext';

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
