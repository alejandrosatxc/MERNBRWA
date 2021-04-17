import React from 'react'
import { Card } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import TextInputLiveFeedBack from './TextInputLiveFeedback'

const Useraccount = ({...props}) => {

    return (
        <Card>
          <h2>My Account</h2>
          <p>
          Please make sure you accurately fill out all the information asked for in this form.
          The information you provide will be used to generate your documents. 
          The way you enter the information is important, because it will be how it appears in the document, 
          so pay close attention to spelling, capitalization, and punctuation.
          </p>
          <Formik
            initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                phone: '',
            }}
            onSubmit={ async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                const updates = JSON.stringify(values);
                console.log(updates);
                
                //axios.update('http://localhost:5000/users/', values)
                //    .then(res => console.log(res.data));
            }}
          >
            <Form>
              <TextInputLiveFeedBack
                label="First Name"
                placeholder="First Name"
                id="first_name"
                name="first_name"
                type="text"
              />
              <TextInputLiveFeedBack
                label="Last Name"
                placeholder="Last Name"
                id="last_name"
                name="last_name"
                type="text"
              />
              <TextInputLiveFeedBack
                label="Email"
                placeholder="Email"
                id="email"
                name="email"
                type="email"
              />
              <TextInputLiveFeedBack
                label="Address"
                placeholder="Street Address"
                id="address"
                name="address"
                type="text"
              />
              <TextInputLiveFeedBack
                label="City"
                placeholder="City"
                id="city"
                name="city"
                type="text"
              />
              <TextInputLiveFeedBack
                label="State"
                placeholder="State"
                id="state"
                name="state"
                type="text"
              />
            </Form>
          </Formik>
        </Card>
    )
}

export default Useraccount
