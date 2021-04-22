import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Card, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

//This might need to be recoded to work as a hook later on
async function loginUser(credentials) {
    return fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}
//Might need to handle situation where the component unmounts beofre a promise resolves
const Login = ({setToken}) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.PreventDefault();
        const token = await loginUser({
            email,
            password
        });
        setToken(token);
    }

    return(
        <Card id="Login">
            <h3>Already have an account?</h3>
            <p>
                Sign in to fill out forms and manage your account.
            </p>
            <Form onSubmit={handleSubmit}>
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