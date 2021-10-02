import {
    SURVEY_LOADED,
    SURVEY_LOADING,
    SURVEY_FAIL,
    USERSUBMISSION_LOADING,
    USERSUBMISSION_LOADED,
    USERSUBMISSION_FAIL,
    CLEAR_FORM
} from '../actions/types';

const initialState = {
    userSubmissionIsLoading: false,
    userSubmission: null,
    surveyIsLoading: false, 
    survey: null
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
        case SURVEY_LOADING:
            return {
                ...state,
                surveyIsLoading: true
            }
        case SURVEY_LOADED:
            return {
                ...state,
                surveyIsLoading: false,
                survey: action.payload
            }
        case SURVEY_FAIL:
            return {
                ...state,
                surveyIsLoading: false,
                survey: null
            }
        case CLEAR_FORM:
            return {
                survey: null,
                userSubmission: null
            }
        default:
            return state;
    }
}