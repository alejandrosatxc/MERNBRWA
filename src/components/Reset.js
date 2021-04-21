import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import TextInputLiveFeedBack from './TextInputLiveFeedback'

const Reset = () => {
    return (
        <Card>
            <h2>Reset your password</h2>
            <p>
                Please enter your email address and a password reset
                link will be sent to you.
            </p>
            <Formik>
                <Form>                    
                    <TextInputLiveFeedBack 
                      label="Email Address"
                      placeholder="Email Address"
                      id="email"
                      name="email"
                      type="email"
                    />
                    <button className="btn btn-primary" type="submit">Reset Password</button>
                </Form>
            </Formik>
            <span>
                Ready to sign in?
                <Link to="/"> Return to the Sign In page</Link>
            </span>
            <span class="type--fine-print block">Don't have an account yet?
			    <Link to="/signup"> Create an account</Link>
		    </span>
        </Card>        
    )
}

export default Reset
