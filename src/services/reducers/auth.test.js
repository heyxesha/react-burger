import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,

    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_FAILED,

    SET_AUTHORIZATION_STATUS
} from '../actions/auth';
import { authReducer } from './auth';

const initialState = {
    accessToken: '',
    refreshToken: '',
    resetTokens: false,
    isRegisterLoading: false,
    isRegisterFailed: false,
    isLoginLoading: false,
    isLoginFailed: false,
    isLogoutLoading: false,
    isLogoutFailed: false,
    isTokenLoading: false,
    isTokenFailed: false,
    isAuthorized: false,
    wasAuthorizationCheck: false
};

const accessToken = '123';
const refreshToken = '321';

describe('Auth reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle REGISTER_REQUEST', () => {
        expect(authReducer(undefined, {
            type: REGISTER_REQUEST
        })).toEqual({
            ...initialState,
            isRegisterLoading: true,
            isRegisterFailed: false
        });
    });

    it('should handle REGISTER_SUCCESS', () => {
        expect(authReducer(undefined, {
            type: REGISTER_SUCCESS,
            accessToken,
            refreshToken
        })).toEqual({
            ...initialState,
            isRegisterLoading: false,
            isRegisterFailed: false,
            accessToken,
            refreshToken,
            isAuthorized: true
        });
    });

    it('should handle REGISTER_FAILED', () => {
        expect(authReducer(undefined, {
            type: REGISTER_FAILED
        })).toEqual({
            ...initialState,
            isRegisterLoading: false,
            isRegisterFailed: true
        });
    });

    it('should handle LOGIN_REQUEST', () => {
        expect(authReducer(undefined, {
            type: LOGIN_REQUEST
        })).toEqual({
            ...initialState,
            isLoginLoading: true,
            isLoginFailed: false
        });
    });

    it('should handle LOGIN_SUCCESS', () => {
        expect(authReducer(undefined, {
            type: LOGIN_SUCCESS,
            accessToken,
            refreshToken
        })).toEqual({
            ...initialState,
            isLoginLoading: false,
            isLoginFailed: false,
            accessToken,
            refreshToken,
            isAuthorized: true
        });
    });

    it('should handle LOGIN_FAILED', () => {
        expect(authReducer(undefined, {
            type: LOGIN_FAILED
        })).toEqual({
            ...initialState,
            isLoginLoading: false,
            isLoginFailed: true
        });
    });

    it('should handle LOGOUT_REQUEST', () => {
        expect(authReducer(undefined, {
            type: LOGOUT_REQUEST
        })).toEqual({
            ...initialState,
            isLogoutLoading: true,
            isLogoutFailed: false,
            resetTokens: false
        });
    });

    it('should handle LOGOUT_SUCCESS', () => {
        expect(authReducer(undefined, {
            type: LOGOUT_SUCCESS
        })).toEqual({
            ...initialState,
            isLogoutLoading: false,
            isLogoutFailed: false,
            accessToken: '',
            refreshToken: '',
            resetTokens: true,
            isAuthorized: false
        });
    });

    it('should handle LOGOUT_FAILED', () => {
        expect(authReducer(undefined, {
            type: LOGOUT_FAILED
        })).toEqual({
            ...initialState,
            isLogoutLoading: false,
            isLogoutFailed: true
        });
    });

    it('should handle UPDATE_TOKEN_REQUEST', () => {
        expect(authReducer(undefined, {
            type: UPDATE_TOKEN_REQUEST
        })).toEqual({
            ...initialState,
            isTokenLoading: true,
            isTokenFailed: false,
            resetTokens: false
        });
    });

    it('should handle UPDATE_TOKEN_SUCCESS', () => {
        expect(authReducer(undefined, {
            type: UPDATE_TOKEN_SUCCESS,
            accessToken,
            refreshToken
        })).toEqual({
            ...initialState,
            isTokenLoading: false,
            isTokenFailed: false,
            accessToken,
            refreshToken
        });
    });

    it('should handle UPDATE_TOKEN_FAILED', () => {
        expect(authReducer(undefined, {
            type: UPDATE_TOKEN_FAILED
        })).toEqual({
            ...initialState,
            isTokenLoading: false,
            isTokenFailed: true
        });
    });

    it('should handle SET_AUTHORIZATION_STATUS', () => {
        expect(authReducer(undefined, {
            type: SET_AUTHORIZATION_STATUS,
            isAuthorized: true
        })).toEqual({
            ...initialState,
            isAuthorized: true,
            wasAuthorizationCheck: true
        });
    });
});