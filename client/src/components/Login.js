import React, { useState, useEffect, useCallback } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Form, Card, Button, Row, Col } from 'react-bootstrap'

import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'

import PropTypes from 'prop-types'

import Signup from './Signup'
import Reset from './Reset'


//Might need to handle situation where the component unmounts beofre a promise resolves
const Login = ({
    isAuthenticated,
    error,
    login,
    clearErrors,
}) => {

    const [active, setActive] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msg, setMsg] = useState();

    const handleChangeEmail = e => setEmail(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    const handleLogin = useCallback(() => {
        clearErrors();
    }, [clearErrors]);

    const handleSubmit = async e => {
        e.preventDefault();
        const user = {email, password};

        // Attempt to login
        login(user);
        clearErrors();
    }

    useEffect(() => {
        // Check for register error
        if(error.id === 'LOGIN_FAIL') {
            setMsg(error.msg.msg);
        } else {
            setMsg(null);
        }

        // If authenticated, idk do some stuff
        if(active) {
            if(isAuthenticated) {
                handleLogin();
            }
        }
    }, [error, isAuthenticated, clearErrors]);

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
                                    onChange={handleChangeEmail}
                                    />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label srOnly="true">Password</Form.Label>
                                    <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    onChange={handleChangePassword}
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
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(Login);