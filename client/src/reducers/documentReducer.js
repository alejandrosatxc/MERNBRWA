import {
    DOCUMENT_LOADING,
    DOCUMENT_LOADED,
    DOCUMENT_FAIL,
    CLEAR_DOCUMENT,
    DOCUMENT_DOWNLOADING,
    DOCUMENT_DOWNLOADED,
    DOCUMENT_DOWNLOAD_FAIL
} from '../actions/types'

const initialState = {
    documentIsDownloading: false,
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
        case DOCUMENT_DOWNLOADING:
            return {
                ...state,
                documentIsDownloading: true
            }
        case DOCUMENT_DOWNLOADED:
            return { 
                ...state,
                documentIsDownloading: false
            }
        case DOCUMENT_DOWNLOAD_FAIL:
            return { 
                ...state,
                documentIsDownloading: false
            }
        case CLEAR_DOCUMENT:
            return {
                document: null
            }
        default:
            return state
    }
}