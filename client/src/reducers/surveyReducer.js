import {
    SURVEY_LOADED,
    SURVEY_LOADING,
    SURVEY_FAIL,
    CLEAR_SURVEY
} from '../actions/types';

const initialState = {
    surveyIsLoading: false, 
    survey: null
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
                survey: action.payload
            }
        case SURVEY_FAIL:
            return {
                ...state,
                surveyIsLoading: false,
                survey: null
            }
        case CLEAR_SURVEY:
            return {
                survey: null,
            }
        default: 
            return state;
    }
}