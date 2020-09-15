import reducer, { initialState } from './auth';
import { AUTH_SUCCESS } from '../actions/actionsTypes';


describe('Auth Reducer', () => {
    it('Should return initial state', () => {
        expect(reducer(undefined, {} as any)).toEqual(initialState);
    });


    it('Should store the token on login', () => {
        const payload = { idToken: 'cjcc', localId: 'anurag' };
        const newState = { ...initialState };
        newState.userId = payload.localId;
        newState.token = payload.idToken;

        expect(reducer(initialState, { type: AUTH_SUCCESS, payload } as any)).toEqual(newState)
    })
})