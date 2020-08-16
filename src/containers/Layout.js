import React from 'react';
import { Container, Navbar, Form, FormControl, InputGroup, NavDropdown, Nav } from 'react-bootstrap';
import mainLogo from '../assets/logo.png';
import { connect } from 'react-redux';
import UserNav from '../components/UserNav';

const Layout = ({ user, dispatch }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          src={mainLogo}
          width="200px"
          height="50px"
          className="d-inline-block align-top"
          alt="Plexis logo"
        />
      </Navbar.Brand>
      <Form className="mx-auto" inline>
        <InputGroup className="search__bar">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Form> 
      <UserNav user={user}/>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Layout);
