import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import history from './history';
import Header from './containers/Header';
import App from './App';
import './main.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import Callback from './components/Callback';
import LoginPage from './components/LoginPage';
import SC from 'soundcloud';
import { CLIENT_ID, REDIRECT_URI } from './constants/auth';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './stores/configureStore';

SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Header/>
      <Router history={history}>
        <Route path="/" exact component={App}/>
        <Route path="/login" component={LoginPage} />
        <Route path="/callback.html" component={Callback}/>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
