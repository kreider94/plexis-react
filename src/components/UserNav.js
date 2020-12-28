import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import history from '../history';
import SC from 'soundcloud';
import { BiHomeAlt, BiLogOutCircle } from "react-icons/bi";

const UserNav = ({ user, handleHomeClick, handleLogoutClick }) => {
  return (
    user ?
      (<Row>
        <Col>
          <Row className="home" onClick={handleHomeClick} style={{height:'40px'}}>
            <Col md={2}>
              <BiHomeAlt className="home__icon" fill="white" size="37px"/>
            </Col>
            <span className="hover__note hover__note_home">go home</span>
          </Row>
          <Row className="logout" onClick={handleLogoutClick} style={{height:'40px'}}>
            <Col md={2}>
              <BiLogOutCircle className="logout__icon" fill="white" size="37px"/>
            </Col>
            <span className="hover__note hover__note_logout">logout</span>
          </Row>
        </Col>
      </Row>)
    : null
  );
}


export default UserNav;
