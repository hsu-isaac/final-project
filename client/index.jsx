import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';

const mapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

ReactDOM.render(
  <LoadScript
    libraries={['places']}
    googleMapsApiKey={mapsApiKey}>
    <Router>
      <App />
    </Router>
  </LoadScript>,
  document.querySelector('#root')
);
