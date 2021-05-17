import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import TextInputLiveFeedback from './TextInputLiveFeedback'

const Resend = () => {
    return (
        <Card>
            <h2>Activate Account</h2>
            <p>
                To have an activation link sent to you, enter the email address
                you registered with below.
            </p>
            <Formik>
                <Form>
                    <TextInputLiveFeedback
                      label="Email"
                      placeholder="Email"
                      name="email"
                      id="email"
                      type="email"
                    />
                    <button className="btn btn-primary" type="submit">Send Activation Email</button>
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
