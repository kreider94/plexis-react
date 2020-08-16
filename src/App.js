import React from 'react';
import { Container, Row, Col, Navbar, Form, FormControl, InputGroup, NavDropdown, Nav } from 'react-bootstrap';
import mainLogo from './assets/logo.png';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Callback from './components/Callback';
import Home from './components/Home';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';

const history = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <div>
        <Container className="app-wrapper" fluid>
          <Home />
        </Container>
      </div>
    )
  }
}

export default App;
