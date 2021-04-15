import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Name is too short!')
        .max(50, 'Name is too Long')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Name is too short!')
        .max(50, 'Name is too Long')
        .required('Required'),
})

const FormikSignup = () => {
    return (
       <Card >
           <h3>Create Account</h3>
            <p>
                The user portal allow you to fill out and generate
                documents that you have purchased or been assigned,
                online and at your leisure.
            </p>
            <Formik 
                
                initialValues={{
                    firstName: '',
                    lastName: ''
                }}

                validationSchema={SignupSchema}
                onSubmit={console.log}
            >
                {({
                errors,
                touched,
                handleSubmit,
                handleChange,
                isValid,
                values
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Row >
                            <Form.Group controlId="signup.firstname">
                                <Form.Label srOnly="true">First Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    isValid={touched.firstName && !errors.firstName}
                                    placeholder="First Name"
                                />
                                <Form.Control.Feedback></Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Invalid</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="signup.lastname">
                                <Form.Label srOnly="true">Last Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    isValid={touched.lastName && !errors.lastName}
                                    placeholder="Last Name" 
                                />
                                <Form.Control.Feedback></Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastName && touched.lastName ? (<div>{errors.lastName}</div>) : null}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit">Sign Up</Button>
                    </Form>
                )}
            </Formik>
       </Card>
    )
}

export default FormikSignup
