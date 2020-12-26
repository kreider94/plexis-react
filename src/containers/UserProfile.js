import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import SC from 'soundcloud';
import Graph from '../components/Graph';
import Sidebar from '../components/Sidebar';
import regeneratorRuntime from "regenerator-runtime";

const UserProfile = ({ storedUser, dispatch }) => {
  const [ user, setUser ] = useState()
  const params = useParams()

  useEffect(() => {
    const id = params.hasOwnProperty('id') ? params.id : '';
    if (storedUser && id === storedUser.id) {
      setUser(storedUser)
    } else {
      resolveUser(id);
    }
  }, [])

  const handleChange = e => {
    const id = e.target.attrs.id.toString();
    resolveUser(id);
  }

  const resolveUser = async (id) => {
    await SC.get(`/users/${id}`).then((user) => {
      setUser(user)
      storedUser = user;
      dispatch({ type: 'SET_USER', user })
    });
  }

  return (
    user ?
      <Row>
        <Col xs={2}>
          <Sidebar user={user}/>
        </Col>
        <Col>
          <Graph user={user} handleChange={handleChange}/>
        </Col>
      </Row>
      : null
      )
    }
    
const mapStateToProps = (state) => {
  return {
    storedUser: state.user.user,
  }
}

export default connect(mapStateToProps)(UserProfile);
