import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Card, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Login = ({setToken}) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    return(
        <Card id="Login">
            <h3>Already have an account?</h3>
            <p>
                Sign in to fill out forms and manage your account.
            </p>
            <Form>
                <Form.Group controlId="signin.email">
                    <Form.Label srOnly="True">Email Address</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Email Address"
                      onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="signin.password">
                    <Form.Label srOnly="true">Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Password" 
                      onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit">Sign in</Button>       
                <p>Forgot your password? Click <Link to="/reset">here to reset</Link>  your password</p>                     
            </Form>
        </Card>
    );

}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login