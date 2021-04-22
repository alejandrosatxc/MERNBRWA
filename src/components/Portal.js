import React from 'react'
import Login from './Login'
import Greeting from './Greeting'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { BrowserRouter as Router } from 'react-router-dom'

const Portal = () => {
    return (
        <Row>
          <Col>
            <Greeting />
          </Col>
          <Col>
            <Login />
          </Col>
        </Row>
    )
}

export default Portal
