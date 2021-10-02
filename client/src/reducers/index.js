import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import surveyReducer from './surveyReducer';
import userSubmissionReducer from './userSubmissionReducer';


export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    survey: surveyReducer,
    userSubmission: userSubmissionReducer
});