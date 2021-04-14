import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const Signup = () => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Card>
            <h3>Create Account</h3>
            <p>
                The user portal allow you to fill out and generate
                documents that you have purchased or been assigned,
                online and at your leisure.
            </p>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="signup.firstname">
                    <Form.Control
                        required 
                        type="text" 
                        placeholder="First Name"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="signup.lastname">
                    <Form.Control 
                        required 
                        type="text" 
                        placeholder="Last Name" 
                    />
                </Form.Group>
                <Form.Group controlId="signup.email">
                    <Form.Control 
                        required 
                        type="email" 
                        placeholder="Email Address" 
                    />
                </Form.Group>
                <Form.Group controlId="signup.password">
                    <Form.Control 
                        required
                        type="password" 
                        placeholder="Password" 
                    />
                </Form.Group>
                <Form.Group controlId="signup.confirmpw">
                    <Form.Control 
                        required 
                        type="password" 
                        placeholder="Confirm Password" 
                    />
                </Form.Group>
            </Form>
            <Button type="submit">Sign Up</Button>
            { /* TODO Create links to sign in and reset your passwords*/}
        </Card>
    )
}

export default Signup
