import { AUTH_INIT, AUTH_FAILED, AUTH_SUCCESS, SET_AUTH_REDIRECT_PATH, AUTH_INITIATE_LOGOUT, AUTH_LOGOUT, AUTH_USER } from "./actionsTypes"
import { FirebaseError } from '../../models/firebaseError.model';

export const authStart = () => {
    return { type: AUTH_INIT }
}

export const authFailed = (error: FirebaseError) => {
    return { type: AUTH_FAILED, payload: { error } }
}

export const authSuccess = (authData: any) => {
    return { type: AUTH_SUCCESS, payload: authData }
}

export const logout = () => {
    return { type: AUTH_INITIATE_LOGOUT }
}

export const logoutSucceed = () => {
    return { type: AUTH_LOGOUT }
}

export const setAuthRedirectPath = (path: string) => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        payload: { authRedirectPath: path }
    }
}

export const auth = (email: string, password: string, method: 'signUp' | 'signIn') => {
    return { type: AUTH_USER, email, password, method }
}