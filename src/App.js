import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserProfile from './containers/UserProfile';
import LoginPage from './components/LoginPage';

const App = ({ user }) => {

  useEffect(() => {
    console.log("refreshing...")
  }, [user]);

  return (
    user ?
      <UserProfile />
    :
      <LoginPage />
  )
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return { user }
}

export default connect(mapStateToProps)(App);