import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Card, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Signin = ({setToken}) => {
    
    return(
        <Card id="Signin">
            <h3>Already have an account?</h3>
            <p>
                Sign in to fill out forms and manage your account.
            </p>
            <Form>
                <Form.Group controlId="signin.email">
                    <Form.Label srOnly="True">Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Email Address"></Form.Control>
                </Form.Group>
                <Form.Group controlId="signin.password">
                    <Form.Label srOnly="true">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"></Form.Control>
                </Form.Group>
                <Link to="/dashboard" >
                    <Button>Sign in</Button>       
                </Link>
                <p>Forgot your password? Click <Link to="/reset">here to reset</Link>  your password</p>                     
            </Form>
        </Card>
    );

}