import {
    DOCUMENT_LOADING,
    DOCUMENT_LOADED,
    DOCUMENT_FAIL,
    CLEAR_DOCUMENT
} from '../actions/types'

const initialState = {
    documentIsLoading: false,
    document: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case DOCUMENT_LOADING:
            return {
                ...state,
                documentIsLoading: true
            }
        case DOCUMENT_LOADED:
            return {
                ...state,
                documentIsLoading: false,
                document: action.payload
            }
        case DOCUMENT_FAIL:
            return {
                ...state,
                documentIsLoading: false,
                document: null
            }
        case CLEAR_DOCUMENT:
            return {
                document: null
            }
        default:
            return state
    }
}