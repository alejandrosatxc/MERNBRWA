import React from 'react'
import axios from 'axios'
import { Card, Button, Col } from 'react-bootstrap'
import { Formik, useFormik, FormikProvider, Form } from 'formik'
import * as Yup from 'yup'
import TextInputLiveFeedback from './TextInputLiveFeedback'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const FormikSignup = () => {

    //Form validation is done using formik. The useFormik function defines
    //the validation schema for each field, their initial values and 
    //code that runs when the form is submitted
    const formik = useFormik({
        initialValues: {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
        },
        onSubmit: async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          const newUser = JSON.stringify(values)
          console.log(newUser);
          
          axios.post('http://localhost:5000/users/add', values)
            .then(res => console.log(res.data));
        },
        validationSchema: Yup.object({
          first_name: Yup.string()
            .min(2, 'Must be at least 2 characters')
            .max(30, 'Must be less  than 30 characters')
            .required('First name is required')
            .matches(
              /^[a-zA-Z\-]+$/,
              'Cannot contain special characters or spaces'
            ),
          last_name: Yup.string()
            .min(2, 'Must be at least 2 characters')
            .max(30, 'Must be less  than 30 characters')
            .required('Last name is required')
            .matches(
              /^[a-zA-Z\-]+$/,
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
                    placeholder="First Name"
                    id="first_name"
                    name="first_name"
                    type="text"
                  />
                  <TextInputLiveFeedback
                    label="Last Name"
                    placeholder="Last Name"
                    id="last_name"
                    name="last_name"
                    type="text"
                  />
                  <TextInputLiveFeedback
                    label="Email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    type="email"
                    />
                  <TextInputLiveFeedback
                    label="Password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="password"
                    />
                  <button type="submit">Sign Up</button>
                </Form>
            </FormikProvider>
        </Card>
      );
}

export default FormikSignup
