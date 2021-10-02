import {
    SURVEY_LOADED,
    SURVEY_LOADING,
    SURVEY_FAIL,
    USERSURVEY_LOADING,
    USERSURVEY_LOADED,
    USERSURVEY_FAIL,
    CLEAR_SURVEY
    //TODO add a CLEAR_SURVEY type to handle clearing
    //all survey data when logging out or switching surveys
} from '../actions/types';

const initialState = {
    surveyIsLoading: false, 
    userSurveyIsLoading: false,
    userSurvey: null,
    surveyJSON: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SURVEY_LOADING:
            return {
                ...state,
                surveyIsLoading: true
            }
        case SURVEY_LOADED:
            return {
                ...state,
                surveyIsLoading: false,
                surveyJSON: action.payload
            }
        case SURVEY_FAIL:
            return {
                ...state,
                surveyIsLoading: false,
                surveyJSON: null
            }
        case USERSURVEY_LOADING:
            return {
                ...state,
                userSurveyIsLoading: true
            }
        case USERSURVEY_LOADED:
            return {
                ...state,
                userSurveyIsLoading: false,
                userSurvey: action.payload
            }
        case USERSURVEY_FAIL:
            return {
                ...state,
                userSurveyIsLoading: false,
                userSurvey: null
            }
        case CLEAR_SURVEY:
            return {
                surveyJSON: null,
                userSurvey: null,
            }
        default: 
            return state;
    }
}