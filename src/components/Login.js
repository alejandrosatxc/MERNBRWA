import React, { useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Form, Card, Button, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Signup from './Signup'
import Reset from './Reset'

//This might need to be recoded to work as a hook later on
async function loginUser(credentials) {
    return fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => console.log(data))
}
//Might need to handle situation where the component unmounts beofre a promise resolves
const Login = ({setToken}) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.PreventDefault();
        console.log("heres a log" )
        const token = await loginUser({
            email,
            password
        });
        console.log(email, password, token )
        setToken(token);
    }

    return(
        <Switch>
            <Route exact path="/">
                <Card id="Login">
                    <Row>
                        <Col>
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
                        </Col>
                        <Col>
                            <h3>Already have an account?</h3>
                            <p>
                                Sign in to fill out forms and manage your account.
                            </p>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="email">
                                    <Form.Label srOnly="True">Email Address</Form.Label>
                                    <Form.Control 
                                    type="email" 
                                    placeholder="Email Address"
                                    onChange={e => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label srOnly="true">Password</Form.Label>
                                    <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    onChange={e => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <button className="btn btn-primary" type="submit">Sign in</button>       
                                <p>Forgot your password? Click <Link to="/reset">here to reset</Link>  your password</p>                     
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Route>
            <Route path="/signup" component={Signup} />
            <Route path="/reset" component={Reset} />
        </Switch>

    );

}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login