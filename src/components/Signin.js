import React, { Component } from 'react';
import { Form, Card, Button } from 'react-bootstrap';

export default class Signin extends Component {
    render() {
        return(
            <Card>
                <h3>Already have an account?</h3>
                <p>
                    Sign in to fill out forms and manage your account.
                </p>
                <Form>
                    <Form.Group controlId="signin.email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Email Address"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="signin.password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"></Form.Control>
                    </Form.Group>
                    <Button>Sign in</Button>                            
                </Form>
            </Card>
        );
    }
}