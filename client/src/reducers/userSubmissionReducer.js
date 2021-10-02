import {
    USERSUBMISSION_LOADING,
    USERSUBMISSION_LOADED,
    USERSUBMISSION_FAIL,
    CLEAR_USERSUBMISSION,
} from '../actions/types';

const initialState = {
    userSubmissionIsLoading: false,
    userSubmission: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case USERSUBMISSION_LOADING:
            return {
                ...state,
                userSubmissionIsLoading: true
            }
        case USERSUBMISSION_LOADED:
            return {
                ...state,
                userSubmissionIsLoading: false,
                userSubmission: action.payload
            }
        case USERSUBMISSION_FAIL:
            return {
                ...state,
                userSubmissionIsLoading: false,
                userSubmission: null
            }
        case CLEAR_USERSUBMISSION:
            return {
                userSubmission: null
            }
        default:
            return state;
    }
}