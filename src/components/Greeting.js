import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';

export default class Greeting extends Component {

    render() {
        return(
            <Card id="Greeting">
                <h3> User Portal</h3>
                <p>
                    The User Portal allows you to fill out forms so that your documents may be generated
                    for review by an attorney. The forms will be available to fill out at your leisure and will
                    provide you a preview of your documents as you fill out the forms.
                    The final documents, that were reviewed by an attorney, will then be uploaded to the
                    User Portal for your review.

                    Sign In or Create an account to begin.
                </p>
                <Link to="/signup">
                    <Button>Create an Account</Button>
                </Link>
            </Card>
        );
    }
}