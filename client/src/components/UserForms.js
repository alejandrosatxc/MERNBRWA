import React from 'react'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

//This component will show a list of all form a user has completed
//and allow them to review thier submission
const UserForms = () => {

    const user = useSelector(state => state.auth.user)

    const formList = user.active_forms.map((form, index) => {
        return (
            <Card>
                <Card.Img variant="top"/>
                <Card.Body>
                    <Card.Title>Surveyid: {form.surveyid}</Card.Title>
                    <Card.Text>Form status: {form.form_status}</Card.Text>
                    <Button variant="primary">View</Button>
                </Card.Body>
            </Card>
        )
    })
    return(
        <Card>
           <Container>
                <Row>
                    {formList}
                </Row>
           </Container>
        </Card>
    )
}

export default UserForms