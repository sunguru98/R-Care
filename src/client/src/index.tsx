import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import history from './redux/createHistory'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
