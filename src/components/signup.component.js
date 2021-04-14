import React, { Component } from 'react';
import { Form, Card, Button } from 'react-bootstrap';

export default class Signup extends Component {
    render() {
        return(
            <Card>
                <h3>Create Account</h3>
                <p>
                    The user portal allow you to fill out and generate
                    documents that you have purchased or been assigned,
                    online and at your leisure.
                </p>
                <Form>
                    <Form.Group controlId="signup.firstname">
                        <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>
                    <Form.Group controlId="signup.lastname">
                        <Form.Control type="text" placeholder="Last Name" />
                    </Form.Group>
                    <Form.Group controlId="signup.email">
                        <Form.Control type="email" placeholder="Email Address" />
                    </Form.Group>
                    <Form.Group controlId="signup.password">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="signup.confirmpw">
                        <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group>
                </Form>
                <Button>Sign Up</Button>
                { /* TODO Create links to sign in and reset your passwords*/}
            </Card>
        );
    }
}