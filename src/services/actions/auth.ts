import Cookies from 'universal-cookie';

import getData from '../../utils/burger-api';

import { TAppThunk } from '../../store';
import IUser from '../../interfaces/user';
import IActionResponseData from '../../interfaces/action-response-data';

interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}

interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly user: IUser;
    readonly accessToken: string;
    readonly refreshToken: string;
}

interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
    readonly error: Error;
}

interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}

interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: IUser;
    readonly accessToken: string;
    readonly refreshToken: string;
}

interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
    readonly error: Error;
}

interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}

interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
    readonly message: string;
}

interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
    readonly message: string;
}

interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
    readonly error: Error;
}

interface IUpdateTokenRequestAction {
    readonly type: typeof UPDATE_TOKEN_REQUEST;
}

interface IUpdateTokenSuccessAction {
    readonly type: typeof UPDATE_TOKEN_SUCCESS;
    readonly accessToken: string;
    readonly refreshToken: string;
}

interface IUpdateTokenFailedAction {
    readonly type: typeof UPDATE_TOKEN_FAILED;
    readonly error: Error;
}

interface ISetAutharizationStatusAction {
    readonly type: typeof SET_AUTHORIZATION_STATUS;
    readonly isAuthorized: boolean;
}

export type TAuthActions =
      IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailedAction
    
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction
    
    | IUpdateTokenRequestAction
    | IUpdateTokenSuccessAction
    | IUpdateTokenFailedAction

    | ISetAutharizationStatusAction;

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const UPDATE_TOKEN_REQUEST: 'UPDATE_TOKEN_REQUEST' = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS: 'UPDATE_TOKEN_SUCCESS' = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED: 'UPDATE_TOKEN_FAILED' = 'UPDATE_TOKEN_FAILED';

export const SET_AUTHORIZATION_STATUS:'SET_AUTHORIZATION_STATUS' = 'SET_AUTHORIZATION_STATUS';

const API_PASS = 'auth';

export function register(name: string, email: string, password: string): TAppThunk<Promise<IActionResponseData>> {
    return function(dispatch) {
        dispatch(registerRequest());
        return getData({
            path: API_PASS + '/register',
            method: 'POST',
            bodyParams: {
                name,
                email,
                password
            }
        }).then(res => {
            dispatch(registerSuccess(res.user, res.accessToken, res.refreshToken));
            return { success: true };
        }).catch(error => {
            dispatch(registerFailed(error));
            return {
                success: false,
                error
            };
        });
    };
};

export function registerRequest(): IRegisterRequestAction {
    return { type: REGISTER_REQUEST };
}

export function registerSuccess(user: IUser, accessToken: string, refreshToken: string): IRegisterSuccessAction {
    return {
        type: REGISTER_SUCCESS,
        user,
        accessToken,
        refreshToken
    };
}

export function registerFailed(error: Error): IRegisterFailedAction {
    return {
        type: REGISTER_FAILED,
        error
    };
}

export function login(email: string, password: string): TAppThunk<Promise<IActionResponseData>> {
    return function(dispatch) {
        dispatch(loginRequest());
        return getData({
            path: API_PASS + '/login',
            method: 'POST',
            bodyParams: {
                email,
                password
            }
        }).then(res => {
            dispatch(loginSuccess(res.user, res.accessToken, res.refreshToken));
            return { success: true };
        }).catch(error => {
            dispatch(loginFailed(error));
            return {
                success: false,
                error
            };
        });
    };
};

export function loginRequest(): ILoginRequestAction {
    return { type: LOGIN_REQUEST };
}

export function loginSuccess(user: IUser, accessToken: string, refreshToken: string): ILoginSuccessAction {
    return {
        type: LOGIN_SUCCESS,
        user,
        accessToken,
        refreshToken
    };
}

export function loginFailed(error: Error): ILoginFailedAction {
    return {
        type: LOGIN_FAILED,
        error
    };
}

export function logout(token: string): TAppThunk<Promise<IActionResponseData>> {
    return function(dispatch) {
        dispatch(logoutRequest());
        return getData({
            path: API_PASS + '/logout',
            method: 'POST',
            bodyParams: { token }
        }).then(res => {
            dispatch(logoutSuccess(res.message));
            return { success: true };
        }).catch(error => {
            dispatch(logoutFailed(error));
            return {
                success: false,
                error
            };
        });
    };
};

export function logoutRequest(): ILogoutRequestAction {
    return { type: LOGOUT_REQUEST };
}

export function logoutSuccess(message: string): ILogoutSuccessAction {
    return {
        type: LOGOUT_SUCCESS,
        message
    };
}

export function logoutFailed(error: Error): ILogoutFailedAction {
    return {
        type: LOGOUT_FAILED,
        error
    };
}

export function updateToken(token: string): TAppThunk<Promise<IActionResponseData>> {
    return function(dispatch) {
        dispatch(updateTokenRequest());
        return getData({
            path: API_PASS + '/token',
            method: 'POST',
            bodyParams: { token }
        }).then(res => {
            dispatch(updateTokenSuccess(res.accessToken, res.refreshToken));
            return {
                success: true,
                accessToken: res.accessToken
            };
        }).catch(error => {
            dispatch(updateTokenFailed(error));
            return {
                success: false,
                error
            };
        });
    };
};

export function updateTokenRequest(): IUpdateTokenRequestAction {
    return { type: UPDATE_TOKEN_REQUEST };
}

export function updateTokenSuccess(accessToken: string, refreshToken: string): IUpdateTokenSuccessAction {
    return {
        type: UPDATE_TOKEN_SUCCESS,
        accessToken,
        refreshToken
    };
}

export function updateTokenFailed(error: Error): IUpdateTokenFailedAction {
    return {
        type: UPDATE_TOKEN_FAILED,
        error
    };
}

export function checkAutharization(): TAppThunk {
    return function(dispatch) {
        const cookies = new Cookies();
        const accessToken = cookies.get('accessToken');
        const refreshToken = cookies.get('refreshToken');
        if (accessToken) {
            dispatch(setAutharizationStatus(true));
        } else if (refreshToken) {
            dispatch(updateToken(refreshToken)).then((res: IActionResponseData) => {
                if (res.success) {
                    dispatch(setAutharizationStatus(true));
                } else {
                    dispatch(setAutharizationStatus(false));
                }
            }).catch((error: Error) => {
                setAutharizationStatus(false);
                return error;
            });
        } else {
            dispatch(setAutharizationStatus(false));
        }
    };
};

export function setAutharizationStatus(isAuthorized: boolean): ISetAutharizationStatusAction {
    return {
        type: SET_AUTHORIZATION_STATUS,
        isAuthorized
    };
}