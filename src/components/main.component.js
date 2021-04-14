import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Greeting from './greeting.component';
import Signin from './signin.component';

export default class Main extends Component {
    render() {
        return(
            <Container className="main-container">
                <Container fluid>
                    <Greeting />
                    <Signin />
                </Container>
            </Container>
        );
    }
}