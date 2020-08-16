import React from 'react';
import { Container, Image } from 'react-bootstrap';
import UserProfile from '../containers/UserProfile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import scLogin from '../assets/connect-sc.png';
import history from '../history';
import { withRouter } from "react-router-dom";


class Home extends React.Component {

  render() {
    if (this.props.user) {
      this.props.history.push('/profile/'+this.props.user.id)
      return null
    } else {
      return (
        <Container id='landing-wrapper' fluid>
          <h1 className="landing-headline">A NETWORK OF ARTISTS</h1>
          <h2 className="landing-subheadline">Find new music you’ll love from the artists you already love</h2>
          <Image id="login-sc" src={scLogin} onClick={this.props.onAuth}/>
        </Container>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return { user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: bindActionCreators(actions.auth, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
