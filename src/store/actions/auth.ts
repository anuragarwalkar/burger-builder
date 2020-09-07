import axios from 'axios';
import { AUTH_INIT, AUTH_FAILED, AUTH_SUCCESS, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from "./actionsTypes"
import { FirebaseError } from '../../models/firebaseError.model';

export const authStart = () => {
    return {
        type: AUTH_INIT
    }
}

export const authFailed = (error: FirebaseError) => {
    return {
        type: AUTH_FAILED,
        payload: { error }
    }
}

export const authSuccess = (authData: any) => {
    return {
        type: AUTH_SUCCESS,
        payload: authData
    }
}

export const logout = () => {
    return {
        type: AUTH_LOGOUT
    }
}

const checkAuthTimeout = (expirationTime: number) => {
    return async (dispatch: any) => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
}

export const setAuthRedirectPath = (path: string) => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        payload: { authRedirectPath: path }
    }
}

const API_KEY = 'AIzaSyBZwytxaVFEY2FTY7D4tDuVIew1Z1zchEQ'

const authUrl = {
    signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    signIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
};

export const auth = (email: string, password: string, method: 'signUp' | 'signIn') => {
    return async (dispatch: any) => {
        dispatch(authStart());
        try {
            const { data } = await axios.post(authUrl[method], { email, password, returnSecureToken: true })
            dispatch(authSuccess(data));
            dispatch(checkAuthTimeout(parseInt(data.expiresIn)));
        } catch (error) {
            dispatch(authFailed(error.response.data.error));
        }
    }
}