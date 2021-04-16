import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import Password from './Password';


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
                <Form.Row>
                    <Form.Group controlId="signup.firstname">
                        <Form.Label srOnly="true">First Name</Form.Label>
                        <Form.Control
                            required 
                            type="text" 
                            placeholder="First Name"
                        />
                        <Form.Control.Feedback></Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="signup.lastname">
                        <Form.Label srOnly="true">Last Name</Form.Label>
                        <Form.Control 
                            required 
                            type="text" 
                            placeholder="Last Name" 
                        />
                        <Form.Control.Feedback></Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="signup.email">
                    <Form.Label srOnly="true">Email Address</Form.Label>
                    <Form.Control 
                        required 
                        type="email" 
                        placeholder="Email Address" 
                    />
                    <Form.Control.Feedback type="invalid">Enter a valid Email</Form.Control.Feedback>
                    { /* TODO Check if email exists in database */ }
                </Form.Group>
                <Password />
                <Button type="submit">Sign Up</Button>
            </Form>
            
            { /* TODO Create links to sign in and reset your passwords*/}
        </Card>
    )
}

export default Signup
