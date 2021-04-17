import React from 'react'
import { Card } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import TextInputLiveFeedBack from './TextInputLiveFeedback'

const Resend = () => {
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
                    <button type="submit">Reset Password</button>
                </Form>
            </Formik>
            <span>
                Ready to sign in?
                <a href="#">Return to the Sign In page</a>
            </span>
            <span class="type--fine-print block">Don't have an account yet?
			    <a href="#">Create an account</a>
		    </span>
        </Card>        
    )
}

export default Resend
