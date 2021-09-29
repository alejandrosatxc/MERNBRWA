import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    SURVEY_LOADED,
    SURVEY_LOADING,
    SURVEY_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,
    surveyIsLoading: false, 
    survey: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };

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

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            }
        
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                survey: null,
                isAuthenticated: false,
                isLoading: false 
            }
        default:
            return state;
    }
}