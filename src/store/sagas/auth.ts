import { put, delay } from 'redux-saga/effects';
import { logoutSucceed, authStart, authSuccess, authFailed, logout } from '../actions/auth';
import axios from 'axios';

export function* logoutSaga() {
    yield put(logoutSucceed()); 
}

const API_KEY = process.env.REACT_APP_GCP;

const authUrl: any = {
    signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    signIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
};

export function* authUserSaga (action: any) {
    yield put(authStart()); 

    try {
        const reqBody = { email: action.email, password: action.password, returnSecureToken: true };
        const { data } = yield axios.post(authUrl[action.method], reqBody)
        yield put(authSuccess(data));
        yield delay((parseInt(data.expiresIn) * 1000));
        yield put(logout())
    } catch (error) {
        yield put(authFailed(error.response.data.error)); 
    }
}