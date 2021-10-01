import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import TextInputLiveFeedBack from './TextInputLiveFeedback'
import { useSelector } from 'react-redux'

const Useraccount = ({...props}) => {

    const user = useSelector(state => state.auth.user);
    //TODO The user object that gets loaded needs to be updated with data from the intake form once it is submitted
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
                  <TextInputLiveFeedBack
                    label="First Name"
                    placeholder="First Name"
                    id="first_name"
                    name="first_name"
                    type="text"
                  />
                </Col>
                <Col>
                  <TextInputLiveFeedBack
                    label="Last Name"
                    placeholder="Last Name"
                    id="last_name"
                    name="last_name"
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextInputLiveFeedBack
                    label="Email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    type="email"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextInputLiveFeedBack
                    label="Address"
                    placeholder="Street Address"
                    id="address"
                    name="address"
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextInputLiveFeedBack
                    label="City"
                    placeholder="City"
                    id="city"
                    name="city"
                    type="text"
                  />
                </Col>
                <Col>
                  <TextInputLiveFeedBack
                    label="State"
                    placeholder="State"
                    id="state"
                    name="state"
                    type="text"
                  />
                </Col>
                <Col>
                  <TextInputLiveFeedBack
                    label="Zip"
                    placeholder="Zip"
                    id="zip"
                    name="zip"
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextInputLiveFeedBack
                    label="Phone"
                    placeholder="Phone"
                    id="phone"
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

export default Useraccount
