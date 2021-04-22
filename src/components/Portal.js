import React from 'react'
import Login from './Login'
import Greeting from './Greeting'
import { Row, Col } from 'react-bootstrap'

const Portal = ({setToken}) => {
    return (
        <Row>
          <Col>
            <Greeting />
          </Col>
          <Col>
            <Login setToken={setToken} />
          </Col>
        </Row>
    )
}

export default Portal
