import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Alert} from 'react-bootstrap'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useSelector, useDispatch } from 'react-redux'
import { register } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'
import MyTextInput from './MyTextInput'


const Register = () => {

    const auth = useSelector(state => state.auth)
    const error = useSelector(state => state.error)
    const [msg, setMsg] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        if(error.id === 'REGISTER_FAIL') {
            setMsg(error.msg.msg);
        } else {
            setMsg(null);
        }
    })
    const schema = Yup.object().shape({
        firstName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
        lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character (i.e. !@#$%&^*)")
    })
    
    return(
        <Card>
            <h3>Create Account</h3>
            <p>
            The user portal allow you to fill out and generate
            documents that you have purchased or been assigned,
            online and at your leisure.
            </p>
            {msg ? <Alert variant="danger">{msg}</Alert> : null}
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                }}
                validationSchema={schema}
                onSubmit={(user, { setSubmitting }) => {
                    user.email = user.email.toLowerCase()
                    dispatch(register(user))
                    setSubmitting(false)
                }}
            >
                <Form>
                    <MyTextInput
                        label="First Name"
                        name="firstName"
                        type="text"
                    />
                    <MyTextInput
                        label="Last Name"
                        name="lastName"
                        type="text"
                    />
                    <MyTextInput
                        label="E-mail"
                        name="email"
                        type="email"
                    />
                    <MyTextInput
                        label="Password"
                        name="password"
                        type="password"
                    />
                    <hr/>
                    <Button type="submit">Register</Button>
                    <span> Already have an account? <Link to="/"> Sign in. </Link></span>
                </Form>
            </Formik>
        </Card>
    )
}

export default Register