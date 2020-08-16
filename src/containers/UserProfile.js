import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Col, Row } from 'react-bootstrap';
import SC from 'soundcloud';
import Graph from '../components/Graph';
import UserInfo from '../components/UserInfo';
import regeneratorRuntime from "regenerator-runtime";
import { withRouter } from "react-router-dom";

const UserProfile = ({ storedUser, dispatch }) => {
  const [ user, setUser ] = useState()
  const params = useParams()
  const history = useHistory()

  useEffect(() => {
    const id = params.hasOwnProperty('id') ? params.id : '';
    if (storedUser && id === storedUser.id) {
      setUser(storedUser)
    } else {
      history.push('/profile/'+id)
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
          <UserInfo user={user}/>
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
