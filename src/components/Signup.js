import React from 'react'
import { Card, Form, Button, Col } from 'react-bootstrap'
import { Formik, useFormik, FormikProvider, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import TextInputLiveFeedback from './TextInputLiveFeedback'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const FormikSignup = () => {

    //Form validation is done using formik. The useFormik function defines
    //the validation schema for each field, their initial values and 
    //code that runs when the form is submitted
    const formik = useFormik({
        initialValues: {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
        },
        onSubmit: async (values) => {
          await sleep(500);
          alert(JSON.stringify(values, null, 2));
        },
        validationSchema: Yup.object({
          firstname: Yup.string()
            .min(2, 'Must be at least 2 characters')
            .max(30, 'Must be less  than 30 characters')
            .required('First name is required')
            .matches(
              /^[a-zA-Z\-]+$/,
              'Cannot contain special characters or spaces'
            ),
          lastname: Yup.string()
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
                    <Form.Row>
                        <TextInputLiveFeedback
                        label="First Name"
                        placeholder="First Name"
                        id="firstname"
                        name="firstname"
                        type="text"
                        />
                        <TextInputLiveFeedback
                        label="Last Name"
                        placeholder="Last Name"
                        id="lastname"
                        name="lastname"
                        type="text"
                        />
                    </Form.Row>
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
                    <Button type="submit">Sign Up</Button>
                </Form>
            </FormikProvider>
        </Card>
      );
}

export default FormikSignup
