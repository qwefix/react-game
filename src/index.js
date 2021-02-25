import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Footer from './Footer'
import getVariables from './getVariables'

getVariables()
ReactDOM.render(
  <React.Fragment>
    <App />
    <Footer />
  </React.Fragment>,
  document.getElementById('root')
);

