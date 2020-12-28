import React from 'react';
import { Navbar } from 'react-bootstrap';
import mainLogo from '../assets/logo.png';
import { connect } from 'react-redux';
import UserNav from '../components/UserNav';
import SearchBar from '../components/SearchBar';

const Layout = () => {

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand
        href="#home" 
        style={{backgroundColor:"#48879e", padding:'5px', borderRadius: '3px'}}
      >
        <img
          src={mainLogo}
          width="200px"
          height="50px"
          className="d-inline-block align-top"
          alt="Plexis logo"
        />
      </Navbar.Brand>
      <SearchBar />
    </Navbar>
  )
}

export default Layout;
