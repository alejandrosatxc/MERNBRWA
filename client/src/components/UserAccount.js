import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { Formik, Form } from 'formik'
//import TextInputLiveFeedBack from './TextInputLiveFeedback'
import { useSelector } from 'react-redux'
import MyTextInput from './MyTextInput'

const UserAccount = ({...props}) => {

    const user = useSelector(state => state.auth.user);
    return (
      <Card>
        <Container>
          <Row>
            <Col>
              <h2>My Account</h2>
              <p>
              Please make sure you accurately fill out all the information asked for in this form.
              The information you provide will be used to generate your documents. 
              The way you enter the information is important, because it will be how it appears in the document, 
              so pay close attention to spelling, capitalization, and punctuation.
              </p>
            </Col>
          </Row>
          <Formik
            initialValues={{
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                address: user.address,
                city: user.city,
                state: user.state,
                zip: user.zip,
                phone: user.phone
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
              <Row>
                <Col>
                  <MyTextInput
                    label="First Name"
                    name="first_name"
                    type="text"
                  />
                </Col>
                <Col>
                  <MyTextInput
                    label="Last Name"
                    name="last_name"
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <MyTextInput
                    label="Email"
                    name="email"
                    type="email"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <MyTextInput
                    label="Address"
                    name="address"
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <MyTextInput
                    label="City"
                    name="city"
                    type="text"
                  />
                </Col>
                <Col>
                  <MyTextInput
                    label="State"
                    name="state"
                    type="text"
                  />
                </Col>
                <Col>
                  <MyTextInput
                    label="Zip"
                    name="zip"
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <MyTextInput
                    label="Phone"
                    name="phone"
                    type="text"
                  />
                </Col>
              </Row>
            </Form>
          </Formik>
        </Container>
      </Card>
    )
}

export default UserAccount
