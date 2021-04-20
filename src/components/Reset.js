import React from 'react'
import { Card } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import TextInputLiveFeedback from './TextInputLiveFeedback'

const Reset = () => {
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
			    <a href="signup.php"> Create an account</a>
            </span>
            <span class="type--fine-print block">Forgot your username or password?
                <a href="reset.php"> Reset your password</a>
            </span>
        </Card>
    )
}

export default Reset
