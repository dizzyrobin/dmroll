import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import App from './App';

const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

firebase.initializeApp({
  apiKey: 'AIzaSyCujxJtuP4W2XhKt5KA9b5uTUG8TA9BsWI',
  authDomain: 'dmroll-7661d.firebaseapp.com',
  databaseURL: 'https://dmroll-7661d.firebaseio.com',
  projectId: 'dmroll-7661d',
  storageBucket: 'dmroll-7661d.appspot.com',
  messagingSenderId: '491963136623',
});

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'));
