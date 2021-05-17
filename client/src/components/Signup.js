import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../actions/authActions'
import { clearErrors} from '../actions/errorActions'

const Register = ({
  isAuthenticated,
  error,
  register,
  clearErrors
}) => {

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleChangeFirstName = e => setFirstName(e.target.value);
  const handleChangeLastName = e => setLastName(e.target.value);
  const handleChangeEmail = e => setEmail(e.target.value);
  const handleChangePassword = e => setPassword(e.target.value);

  const handleOnSubmit = e => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password
    };
    // Attempt to login
    register(user);
  }

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    // If authenticated do stuff
    if(isAuthenticated) {
      
    }
  }, [error, isAuthenticated])

  return (
    <Card>
        <h3>Create Account</h3>
        <p>
            The user portal allow you to fill out and generate
            documents that you have purchased or been assigned,
            online and at your leisure.
        </p>
        {msg ? <Alert color="danger">{msg}</Alert> : null}
        <Form onSubmit={handleOnSubmit}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              onChange={handleChangeFirstName}
            />
            
            <Label for="lastName">First Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              onChange={handleChangeLastName}
            />

            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChangeEmail}
            />

            <Label for="password">Password</Label>
            <Input
              type="text"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChangePassword}
            />
            <Button>
              Register
            </Button>
            <span>Already have an account? <Link to="/"> Sign in. </Link></span>
          </FormGroup>
        </Form>
    </Card>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(Register)
