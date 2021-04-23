import axios from 'axios';
import { returnErrors } from './errorActions'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

 //Check token & load user
 export const loadUser = () => (dispatch, getState) => {    //get token from state
    // User loading
    dispatch({ type: USER_LOADING });



    axios.get('/api/auth/user', tokenConfig(getState )) // returns a promise
      .then(res => dispatch({
          type: USER_LOADED,
          payload: res.data
      }))
      .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status));
          dispatch({
              type: AUTH_ERROR
          });
      }); //i.e. if token is invalid
};

// Setup config/headers and token
export const tokenConfig = getState => {
        // Get token from sessionStorage
        const token = getState().auth.token;

        // Headers
        const config = { 
            headers: {
                "Content-type": "application/json"
            }
        }
    
        // If token, add to headers
        if(token) {
            config.headers['x-auth-token'] = token;
        }

    return config;
}