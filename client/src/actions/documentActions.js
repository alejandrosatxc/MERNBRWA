import axios from 'axios'
import { returnErrors } from './errorActions'

import {
    DOCUMENT_LOADING,
    DOCUMENT_LOADED,
    DOCUMENT_FAIL,
    DOCUMENT_DOWNLOADING,
    DOCUMENT_DOWNLOADED,
    DOCUMENT_DOWNLOAD_FAIL
} from './types'

export const loadDocument = (document_id) => (dispatch) => {
    //Document loading
    dispatch({ type: DOCUMENT_LOADING})

    axios.get('/api/documents?document_id=' + document_id)
        .then(res => dispatch({
            type: DOCUMENT_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: DOCUMENT_FAIL
            })
        })
}

export const downloadDocument = (googleDocId) => (dispatch) => {
    dispatch({ type: DOCUMENT_DOWNLOADING })

    axios.get('/api/documents/download?googleDocId=' + googleDocId)
        .then(res => dispatch({
            type: DOCUMENT_DOWNLOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({ type: DOCUMENT_DOWNLOAD_FAIL })
        })
}