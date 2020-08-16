import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import history from './history';
import './index.css';
import Layout from './containers/Layout';
import App from './App';
import UserProfile from './containers/UserProfile';
import Home from './components/Home';
import Callback from './components/Callback';
import * as serviceWorker from './serviceWorker';
import configureStore from './stores/configureStore';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { CLIENT_ID, REDIRECT_URI } from './constants/auth';
import SC from 'soundcloud';

SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Layout/>
      <Router history={history}>
        <Route path="/" exact component={Home}/>
        <Route path="/profile/:id" component={UserProfile} />
        <Route path="/callback.html" component={Callback}/>
      </Router>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();