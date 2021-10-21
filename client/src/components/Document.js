import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loadDocument } from '../actions/documentActions'
import RecursiveProperty from './RecursiveProperty.tsx'


const Document = () => {
    const { document_id } = useParams()
    const document = useSelector(state => state.document)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(loadDocument(document_id))
    },[])
 
    return (
        <Card>
            {document.document
                ? <RecursiveProperty 
                    property={document.document.fields ? document.document.fields : null} 
                    propertyName="Root Property" 
                    excludeBottomBorder={false} 
                    rootProperty={true} />
                : <p>Nothing here</p> 
            }
        </Card>
    )
}

export default Document