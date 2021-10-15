import React from 'react' 
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserDocuments = () => {

    const user = useSelector(state => state.auth.user)
    const documentList = user.user_documents.map((doc, idx) => {
        //TODO Create links/route to user documents
        return (
            <Card>
                <Card.Img variant="top"/>
                <Card.Body>
                    <Card.Title>{doc.name}</Card.Title>
                    <Card.Text>Here is a finished Document</Card.Text>
                </Card.Body>
                
            </Card>
        )
    })
    return(
        <Card>
            <Container>
                <Row>
                    {documentList}
                </Row>
            </Container>
        </Card>
    )
}

export default UserDocuments