import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import formReducer from './formReducer';


export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    form: formReducer
});