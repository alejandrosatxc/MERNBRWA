import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import formReducer from './formReducer';
import documentReducer from './documentReducer'

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    form: formReducer,
    document: documentReducer
});