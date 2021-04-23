import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap';
import Usernav from './Usernav'
import Useraccount from './Useraccount'
import Survey from './Survey'

const Dashboard = () => {
        return(
          <Router>  
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
          </Router>
        );
}

export default Dashboard