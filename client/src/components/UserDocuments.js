import React from 'react' 
import { Card, Container, Row, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { downloadDocument } from '../actions/documentActions'
import { useDispatch } from 'react-redux'

const UserDocuments = () => {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const documentList = user.user_documents.map((doc, idx) => {
        //TODO Create links/route to user documents
        return (
            <Card>
                <Card.Img variant="top"/>
                <Card.Body>
                    <Card.Title>{doc.name}</Card.Title>
                    <Card.Text>For: {doc.username}</Card.Text>
                    <Link to={`/document/${doc.udoc_id}`}>View</Link>
                    <Button onClick={() => dispatch(downloadDocument(doc.googleDocId))}>Download</Button>
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