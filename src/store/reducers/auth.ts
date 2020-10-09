import { AuthState } from "../../models/authState.model";
import { AUTH_INIT, AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from "../actions/actionsTypes";
import { updateObject } from "../../utils/functions";
import { FirebaseError } from "../../models/firebaseError.model";

export const initialState: AuthState = {
    loading: false,
    token: '',
    userId: '',
    error: '',
    authRedirectPath: '/'
}

type actionType = { type: string, payload: { error: FirebaseError, 
    idToken: string, localId: string } };

const authStart = (state: AuthState) => {
    return updateObject(state, { error: '', loading: true })
}

const authSuccess = (state: AuthState, action: actionType) => {
    const { idToken: token, localId: userId } = action.payload
    return updateObject(state, { token, userId, error: '', loading: false });
}

const authFailed = (state: AuthState, action: actionType) => {
    const { error } = action.payload;
    return updateObject(state, { error: error.message, loading: false });
}

const authLogout = (state: AuthState) => {
    return updateObject(state, { token: '', userId: ''});
}

const setAuthRedirect = (state: AuthState, action: actionType) => {
    return updateObject(state, action.payload);
}

const reducer = (state = initialState, action: actionType) => {
    switch (action.type) {
        case AUTH_INIT:
            return authStart(state);

        case AUTH_SUCCESS:
            return authSuccess(state, action);

        case AUTH_FAILED:
            return authFailed(state, action);

        case AUTH_LOGOUT: 
            return authLogout(state);    

        case SET_AUTH_REDIRECT_PATH:
            return setAuthRedirect(state, action);    
    }
    
    return state;
}

export default reducer;