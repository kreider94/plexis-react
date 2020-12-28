import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import history from '../history';
import UserProfile from '../containers/UserProfile';
import LoginPage from './LoginPage';

// class Home extends React.Component {
const Home = ({ user }) => {

  useEffect(() => {
    console.log("refreshing...")
  }, [user]);

  return (
    user ?
      <UserProfile />
    :
      <LoginPage />
  )
  // if (user) {
  //   history.push('/profile/'+user.id)
  //   return null;
  // } else {
  //   history.push('/login')
  //   return null;
  // }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return { user }
}

export default connect(mapStateToProps)(Home);
