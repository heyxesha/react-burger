
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

    SET_AUTHORIZATION_STATUS,

    TAuthActions
} from '../actions/auth';

export interface IAuthState {
    accessToken: string;
    refreshToken: string;
    resetTokens: boolean;

    isRegisterLoading: boolean;
    isRegisterFailed: boolean;

    isLoginLoading: boolean;
    isLoginFailed: boolean;

    isLogoutLoading: boolean;
    isLogoutFailed: boolean;

    isTokenLoading: boolean;
    isTokenFailed: boolean;

    isAuthorized: boolean;
    wasAuthorizationCheck: boolean;
};

const initialState: IAuthState = {
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

export const authReducer = (state = initialState, action: TAuthActions) => {
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
                isAuthorized: true
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
                isAuthorized: true
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
                resetTokens: true,
                isAuthorized: false
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
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            };
        case UPDATE_TOKEN_FAILED:
            return {
                ...state,
                isTokenLoading: false,
                isTokenFailed: true
            };
        case SET_AUTHORIZATION_STATUS:
            return {
                ...state,
                isAuthorized: action.isAuthorized,
                wasAuthorizationCheck: true
            };
        default: {
            return state;
        }
    }
};