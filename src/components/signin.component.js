import React, { Component } from 'react';
import { Form, Card } from 'react-bootstrap';

export default class Signin extends Component {
    render() {
        return(
            <Card>
                <h3>Already have an account?</h3>
                <p>
                    Sign in to fill out forms and manage your account.
                </p>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Email Address"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"></Form.Control>
                    </Form.Group>                            
                </Form>
            </Card>
        );
    }
}