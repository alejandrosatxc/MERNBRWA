import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Greeting from './greeting.component';
import Signin from './signin.component';
import Signup from './Signup';
import Usernav from './Usernav'
import Useraccount from './Useraccount'

export default class Main extends Component {
    render() {
        return(
            <Container className="main-container">
                <Container fluid>
                    <Usernav />
                    <Useraccount />
                </Container>
            </Container>
        );
    }
}