import React from 'react';
import { Image, Row, NavDropdown } from 'react-bootstrap';
import SC from 'soundcloud';

const UserNav = ({ user }) => {
  return (
    user ?
      <Row>
        <Image className="user__avatar" src={user.avatar_url} roundedCircle />
        <NavDropdown className="user__username m-auto" title={user.username} id="collasible-nav-dropdown">
          <NavDropdown.Item href={`/profile/${user.id}`}>Home</NavDropdown.Item>
          <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Row>
    : null );
}

const Logout = () => {
  SC.initialize({ client_id: null, redirect_uri: null });
}

export default UserNav;
