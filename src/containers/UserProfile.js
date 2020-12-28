import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import SC from 'soundcloud';
import Graph from '../components/Graph';
import Sidebar from '../components/Sidebar';
import LoginPage from '../components/LoginPage';
import UserNav from '../components/UserNav';
import history from '../history';
import regeneratorRuntime from "regenerator-runtime";

const UserProfile = ({ storedUser, signedInUser, dispatch }) => {

  useEffect(() => {
    if (storedUser && storedUser.username !== "undefined") {
      resolveUser(storedUser.id)
    }
  }, [storedUser])

  useEffect(() => {
  }, [storedUser])


  useEffect(() => {
    if (window.location.href.indexOf('home') > -1) {
      let user = signedInUser;
      resolveUser(signedInUser.id);
      window.location.href = "http://plexis.org/";
    } else if (signedInUser && (!storedUser || storedUser.username === "undefined")) {
      let user = signedInUser;
      dispatch({ type: 'SET_USER', user })
    }
  })

  const handleChange = e => {
    const id = e.target.attrs.id.toString();
    resolveUser(id);
  }

  const resolveUser = async (id) => {
    if (storedUser.id !== id) {
      await SC.get(`/users/${id}`).then((user) => {
        dispatch({ type: 'SET_USER', user })
      });
    }
  }

  const goHome = () => {
    let user = signedInUser;
    dispatch({ type: 'SET_USER', user });
  }

  const onLogout = () => {
    SC.initialize({ client_id: null, redirect_uri: null });
    dispatch({ type: 'LOGOUT' });
  }

  return (
    signedInUser ?
      storedUser ?
          <Row>
            <Col xs={2}>
              <Sidebar user={storedUser}/>
              <UserNav className="plexis__menu" user={signedInUser} handleHomeClick={goHome} handleLogoutClick={onLogout}/>
            </Col>
            <Col>
              <Graph user={storedUser} handleChange={handleChange}/>
            </Col>
          </Row>
        : null
    : (<LoginPage />)
  )
}
    
const mapStateToProps = (state) => {
  return {
    storedUser: state.user.user,
    signedInUser: state.auth.user
  }
}

export default connect(mapStateToProps)(UserProfile);
