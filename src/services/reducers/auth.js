
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
    UPDATE_TOKEN_FAILED
} from '../actions/auth';

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
    isTokenFailed: false
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                isRegisterLoading: true,
                isRegisterError: false
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegisterLoading: false,
                isRegisterFailed: false,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            };
        case REGISTER_FAILED:
            return {
                ...state,
                isRegisterLoading: false,
                isRegisterFailed: true
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoginLoading: true,
                isLoginError: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoginLoading: false,
                isLoginFailed: false,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            };
        case LOGIN_FAILED:
            return {
                ...state,
                isLoginLoading: false,
                isLoginFailed: true
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLogoutLoading: true,
                isLogoutError: false,
                resetTokens: false
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLogoutLoading: false,
                isLogoutFailed: false,
                accessToken: initialState.accessToken,
                refreshToken: initialState.refreshToken,
                resetTokens: true
            };
        case LOGOUT_FAILED:
            return {
                ...state,
                isLogoutLoading: false,
                isLogoutFailed: true
            };
        case UPDATE_TOKEN_REQUEST:
            return {
                ...state,
                isTokenLoading: true,
                isTokenError: false,
                resetTokens: false
            };
        case UPDATE_TOKEN_SUCCESS:
            return {
                ...state,
                isTokenLoading: false,
                isTokenFailed: false,
                accessToken: action.accessToken
            };
        case UPDATE_TOKEN_FAILED:
            return {
                ...state,
                isTokenLoading: false,
                isTokenFailed: true
            };
        default: {
            return state;
        }
    }
};