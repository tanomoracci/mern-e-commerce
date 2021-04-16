import axios from 'axios';
import { returnErrors} from './errorActions';
import {USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from './types';

export const loadUser = () => (dispatch, getState) => {
    //User Loading
    dispatch({type: USER_LOADING});

    axios.get('/api/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data,
        }))
        .catch (err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR,
            });
        });

} 

export const register = ({ name, email, password}) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json",
        }
    }

    //Request Body
    const body = JSON.stringify({name, email, password});

        axios.post('/api/register', body, config)
            .then(res => dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
                dispatch({
                    type: REGISTER_FAIL,
                });
            });
}

export const login = ({email, password}) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json",
        }
    }

    //Request Body
    const body = JSON.stringify({email, password});

        axios.post('/api/login', body, config)
            .then(res => dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
                dispatch({
                    type: LOGIN_FAIL,
                });
            )};
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS,
    }
}

//Setup config/headers and Token
export const token = getState => {
    // get token from local storage
    const token = getState().auth.token;

    //Headers
    const config => {
        headers: {
            "Content-type":"application/json",
        }
    }

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}