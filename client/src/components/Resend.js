import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import MyTextInput from './MyTextInput'

const Resend = () => {
    return (
        <Card>
            <h2>Activate Account</h2>
            <p>
                To have an activation link sent to you, enter the email address
                you registered with below.
            </p>
            <Formik
                initialValues={{
                    email: ''
                }}>
                <Form>
                    <MyTextInput
                      label="Email"
                      name="email"
                      type="email"
                    />
                    <hr/>
                    <Button type="submit">Send Activation Email</Button>
                </Form>
            </Formik>
            <span class="type--fine-print block">Don't have an account yet?
			    <Link to="/signup">
                     Create an account
                </Link>
            </span>
            <span class="type--fine-print block">Forgot your username or password?
                <Link to="/reset">
                     Reset your password
                </Link>
            </span>
        </Card>
    )
}

export default Resend
