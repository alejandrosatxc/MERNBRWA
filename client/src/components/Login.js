import React, { useState, useEffect, useCallback } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Card, Button, Row, Col, Alert} from 'react-bootstrap'
import * as Yup from 'yup'
import { Formik, Form} from 'formik'

import { useSelector, useDispatch } from 'react-redux'
import { login } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'

import MyTextInput from './MyTextInput'
import Register from './Register'
import Reset from './Reset'

const Login = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const error = useSelector(state => state.error)
    const [msg, setMsg] = useState()
    

    useEffect(() => {
        //Check for login error
        if(error.id === 'LOGIN_FAIL') {
            setMsg(error.msg.msg)
        } else {
            setMsg(null)
        }

        if(auth.isAuthenticated) {
            clearErrors();
        }
    })

    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Enter your email'),
        password: Yup.string().required('Required')
    })

    return(
        <Switch>
            <Route exact path="/">
                <Card id="Login">
                    <Row>
                        <Col>
                            <h3> User Portal</h3>
                            <p>
                                The User Portal allows you to securely provide information to our law firm. Throughout your
                                time as a client with us, you may be asked to fill out forms in this secure portal so that we may
                                quickly generate documents for your case. The final documents will be uploaded to the User Portal
                                for your review and future access. You will recieve electronic notification when a new document is
                                added.

                                Sign In or Create an account to begin.
                            </p>
                            <br/>
                            <hr/>
                            <Link to="/signup">
                                <Button>Create an Account</Button>
                            </Link>
                        </Col>
                        <Col>
                            <h3>Already have an account?</h3>
                            <p>
                                Sign in to fill out forms and manage your account.
                            </p>
                            {msg ? <Alert variant="danger">{msg}</Alert> : null}
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: ''
                                }}
                                validationSchema={schema}
                                onSubmit={(credentials, { setSubmitting }) => {
                                    credentials.email = credentials.email.toLowerCase()
                                    dispatch(login(credentials))
                                    dispatch(clearErrors())
                                }}>
                                    <Form>
                                        <MyTextInput
                                            label='Email'
                                            name='email'
                                            type='email'
                                        />
                                        <MyTextInput
                                            label='Password'
                                            name='password'
                                            type='password'
                                        />
                                        <hr/>
                                        <Button type="submit">Sign in</Button>
                                        <p>Forgot your password? Click <Link to="/reset">here to reset</Link>  your password</p>   
                                    </Form>                  
                            </Formik>
                        </Col>
                    </Row>
                </Card>
            </Route>
            <Route path="/signup" component={Register} />
            <Route path="/reset" component={Reset} />
        </Switch>
    )
}

export default Login