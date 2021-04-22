import React, { useState } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import {  useFormik, FormikProvider, Form } from 'formik'
import * as Yup from 'yup'
import TextInputLiveFeedback from './TextInputLiveFeedback'

const generateSalt = (length) => {

  var result           = [];
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
}

const FormikSignup = () => {

    //Form validation is done using formik. The useFormik function defines
    //the validation schema for each field, their initial values and 
    //code that runs when the form is submitted

    const [salt, setSalt] = useState('') //Generate a unique salt for each user
    
    const formik = useFormik({
        initialValues: {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
        },
        onSubmit: async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          let newUser = {
            ...values
          }
          const hash = require("crypto")
            .createHash("sha256")
            .update(newUser.password.concat(salt))
            .digest("hex");
          newUser.hash = hash
          newUser.salt = setSalt(generateSalt(20))
          delete newUser.password
          console.log(newUser);
          axios.post('https://bell-ripper-web-app/users/add', newUser)
            .then(res => console.log(res.data));
        },
        validationSchema: Yup.object({
          first_name: Yup.string()
            .min(2, 'Must be at least 2 characters')
            .max(30, 'Must be less  than 30 characters')
            .required('First name is required')
            .matches(
              /^[a-zA-Z-]+$/,
              'Cannot contain special characters or spaces'
            ),
          last_name: Yup.string()
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
                    id="first_name"
                    name="first_name"
                    type="text"
                  />
                  <TextInputLiveFeedback
                    label="Last Name"
                    id="last_name"
                    name="last_name"
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
