import { put, delay } from 'redux-saga/effects';
import { logoutSucceed, authStart, authSuccess, authFailed, logout } from '../actions/auth';
import axios from 'axios';

export function* logoutSaga() {
    yield put(logoutSucceed()); 
}

const API_KEY = process.env.REACT_APP_GCP;

const authUrl: {baseUrl: string, signUp: string, signIn: string} = {
    baseUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:',
    get signUp() {return `${this.baseUrl}signUp?key=${API_KEY}`},
    get signIn() {return `${this.baseUrl}signInWithPassword?key=${API_KEY}`}
};

export function* authUserSaga (action: {email: string, password: string, method: 'signUp' | 'signIn'}) {
    yield put(authStart()); 

    try {
        const method = authUrl[action.method];
        const reqBody = { email: action.email, password: action.password, returnSecureToken: true };
        const { data } = yield axios.post(method, reqBody)
        yield put(authSuccess(data));
        yield delay((parseInt(data.expiresIn) * 1000));
        yield put(logout())
    } catch (error) {
        yield put(authFailed(error.response.data.error)); 
    }
}