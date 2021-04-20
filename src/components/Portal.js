import React from 'react'
import Signin from './Signin'
import Greeting from './Greeting'
import { Container, Row, Col, Card } from 'react-bootstrap'

const Portal = () => {
    return (
    <Container className="main-container" fluid>
        <Row>
          <Col>
            <Greeting />
          </Col>
          <Col>
            <Signin />
          </Col>
        </Row>
    </Container>
    )
}

export default Portal
