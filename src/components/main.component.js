import React, { Component } from 'react';
import { Button, Container, Card, Form } from 'react-bootstrap';

export default class Main extends Component {
    render() {
        return(
            <Container className="main-container">
                <Container fluid>
                    <Card>
                        <h3> User Portal</h3>
                        <p>
                            The User Portal allows you to fill out forms so that your documents may be generated
                            for review by an attorney. The forms will be available to fill out at your leisure and will
                            provide you a preview of your documents as you fill out the forms.
                            The final documents, that were reviewed by an attorney, will then be uploaded to the
                            User Portal for your review.

                            Sign In or Create an account to begin.
                        </p>
                        <Button>Create an Account</Button>
                    </Card>
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
                            
                        </Form>
                    </Card>
                </Container>
            </Container>
        );
    }
}