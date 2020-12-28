import React, { useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { auth } from '../actions';
import scLogin from '../assets/connect-sc.png';
import history from '../history';

const LoginPage = ({ onAuth, user }) => {

    useEffect(() => {
        console.log("logging in");
    }, [user])

    if (user) {
        history.push('/')
        return null;
    } else {
        return (<div>
            <Container id='landing-wrapper' fluid>
                <h1 className="landing-headline">A NETWORK OF ARTISTS</h1>
                <h2 className="landing-subheadline">Find new music you’ll love from the artists you already love</h2>
                <Image id="login-sc" src={scLogin} onClick={onAuth}/>
            </Container>
        </div>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: bindActionCreators(auth, dispatch)
    };
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    return { user }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
