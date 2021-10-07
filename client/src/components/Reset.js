import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { Formik, Form } from 'formik'
//import TextInputLiveFeedBack from './TextInputLiveFeedback'
import MyTextInput from './MyTextInput'

const Reset = () => {
    //TODO add an on submit handler for password resetting
    return (
        <Card>
            <h2>Reset your password</h2>
            <p>
                Please enter your email address and a password reset
                link will be sent to you.
            </p>
            <Formik
                initialValues={{
                    email: ''
                }}>
                <Form>                    
                    <MyTextInput
                      label="Email Address"
                      name="email"
                      type="email"
                    />
                    <hr/>
                    <Button type="submit">Reset Password</Button>
                </Form>
            </Formik>
            <span>
                Ready to sign in?
                <Link to="/"> Return to the Sign In page</Link>
            </span>
            <span className="type--fine-print block">Don't have an account yet?
			    <Link to="/signup"> Create an account</Link>
		    </span>
        </Card>        
    )
}

export default Reset
