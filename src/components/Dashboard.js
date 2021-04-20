import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
import Greeting from './Greeting';
import Signin from './Signin';
import Signup from './Signup';
import Usernav from './Usernav'
import Useraccount from './Useraccount'
import Resend from './Resend'
import Survey from './Survey'

export default class Dashboard extends Component {
    render() {
        return(
            <Row>
                <Col>
                    <Usernav/>
                </Col>
                <Col>
                  <Switch>  
                    <Route path="/dashboard/survey" component={Survey} />
                    <Route path="/dashboard/account" component={Useraccount} />
                  </Switch>
                </Col>
            </Row>
        );
    }
}