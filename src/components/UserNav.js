import React from 'react';
import { Image, Card, Row, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const UserNav = ({ user }) => {
  return (
    user ?
      <Row>
        <Image className="user__avatar" src={user.avatar_url} roundedCircle />
        <NavDropdown className="user__username m-auto" title={user.username} id="collasible-nav-dropdown">
          <NavDropdown.Item href={`/profile/${user.id}`}>Home</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
        </NavDropdown>
      </Row>
    : null );
}

export default UserNav;
