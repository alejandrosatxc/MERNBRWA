import React from 'react'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

//This component will show a list of all form a user has completed
//and allow them to review thier submission
const UserForms = () => {

    const user = useSelector(state => state.auth.user)

    const formList = user.active_forms.map((form, index) => {

        //TODO this naming switchcase should be handled differently in a different location
        var name = ''
        var surveyMode = ''
        switch(form.surveyid) {
            case 1:
                name = "Intake"
                surveyMode = "display"
                break;
            case 2:
                name = "Attorney Form"
                surveyMode = "edit"
                break;
            default:
                name = "Undefined"
        }

        return (
            <Card>
                <Card.Img variant="top"/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        <p>Form status: {form.form_status}</p>
                        {user.role === "Admin"
                            ? <p>For: {form.user_name}</p>
                            : null
                        }
                    </Card.Text>

                    <Link to={`/form/${form.surveyid}/${surveyMode}/${form.form_id}`}>{(surveyMode === 'display') ? "View" : "Edit"}</Link>
                    <br/>
                    {
                    //<Link to={`/form/${form.surveyid}/edit`} >Edit</Link>
                    }
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