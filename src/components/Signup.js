import React from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import {  useFormik, FormikProvider, Form } from 'formik'
import * as Yup from 'yup'
import TextInputLiveFeedback from './TextInputLiveFeedback'

const FormikSignup = () => {

    //Form validation is done using formik. The useFormik function defines
    //the validation schema for each field, their initial values and 
    //code that runs when the form is submitted
    
    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        },
        onSubmit: async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          console.log(values);
          axios.post('http://localhost:5000/api/users', values)
            .then(res => console.log(res.data));
        },
        validationSchema: Yup.object({
          firstName: Yup.string()
            .min(2, 'Must be at least 2 characters')
            .max(30, 'Must be less  than 30 characters')
            .required('First name is required')
            .matches(
              /^[a-zA-Z-]+$/,
              'Cannot contain special characters or spaces'
            ),
          lastName: Yup.string()
            .min(2, 'Must be at least 2 characters')
            .max(30, 'Must be less  than 30 characters')
            .required('Last name is required')
            .matches(
              /^[a-zA-Z-]+$/,
              'Cannot contain special characters or spaces'
            ),
          email: Yup.string()
            .email('Invalid email')
            .required('Required'),
          password: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .required('Required'),
        }),
    });
    
      return (
        <Card>
            <h3>Create Account</h3>
            <p>
                The user portal allow you to fill out and generate
                documents that you have purchased or been assigned,
                online and at your leisure.
            </p>
            <FormikProvider value={formik}>
                <Form>
                  <TextInputLiveFeedback
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    type="text"
                  />
                  <TextInputLiveFeedback
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                    type="text"
                  />
                  <TextInputLiveFeedback
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    />
                  <TextInputLiveFeedback
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    />
                  <button className="btn btn-primary" type="submit">Sign Up</button>
                </Form>
            </FormikProvider>
        </Card>
      );
}

export default FormikSignup
