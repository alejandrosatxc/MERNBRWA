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
    REGISTER_FAIL,
    CLEAR_SURVEY,
    CLEAR_USERSUBMISSION
} from './types';
//TODO Survey types/actions and functions need their own file
//Check token & load user
export const loadUser = () => (dispatch, getState) => {    //get token from state
    // User loading
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', tokenConfig(getState)) // returns a promise
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

// Register User
export const register = ({ firstName, lastName, email, password}) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({firstName, lastName, email, password});

    axios.post('/api/users', body, config)
      .then(res => dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
      }))
      .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
          dispatch({
              type: REGISTER_FAIL
          });
      });
}

// Login User
export const login = ({ email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ email, password });
    axios
      .post('/api/auth', body, config)
      .then(res => 
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
      )
      .catch(err => {
          dispatch(
              returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
          );
          dispatch({
              type: LOGIN_FAIL
          });
      });
};

// Logout User
//TODO redirect to signin page after logout
export const logout = () => (dispatch) => {
    dispatch({type: CLEAR_SURVEY}); //Clear all survey data
    dispatch({type: CLEAR_USERSUBMISSION}) //Clear all userSubmission data
    dispatch({type: LOGOUT_SUCCESS}) //Clear all auth/user data
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