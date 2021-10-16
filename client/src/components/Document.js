import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { loadDocument } from '../actions/documentActions'

const Document = () => {
    const { document_id } = useParams()
    const document = useSelector(state => state.document)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(loadDocument(document_id))
    },[])
 
    const handleLoad = () => {
        
        if(document.document.fields) {
            return JSON.stringify(document.document.fields,null,2)
        } else {
            return "ok"
        }
    }
    return (
        <Card>
            <p>{document.document
                ? handleLoad()
                : null }</p>
        </Card>
    )
}

export default Document