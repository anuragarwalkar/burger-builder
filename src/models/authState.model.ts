export interface AuthState {
    loading: boolean,
    token: string,
    userId: string,
    error: string,
    authRedirectPath: string
}