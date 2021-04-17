import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Greeting from './Greeting';
import Signin from './Signin';
import Signup from './Signup';
import Usernav from './Usernav'
import Useraccount from './Useraccount'
import Resend from './Resend'

export default class Dashboard extends Component {
    render() {
        return(
            <Container className="main-container">
                <Container fluid>
                    <Resend />
                </Container>
            </Container>
        );
    }
}