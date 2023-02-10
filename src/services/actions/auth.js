import getData from '../../utils/burger-api';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';

const API_PASS = 'auth';

export function register(name, email, password) {
    return function(dispatch) {
        dispatch(registerRequest());
        return getData(API_PASS + '/register', {
                name,
                email,
                password
            }).then(res => {
            dispatch(registerSuccess(res));
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

export function registerRequest() {
    return { type: REGISTER_REQUEST };
}

export function registerSuccess(res) {
    return {
        type: REGISTER_SUCCESS,
        user: res.user,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken
    };
}

export function registerFailed(error) {
    return {
        type: REGISTER_FAILED,
        error
    };
}

export function login(email, password) {
    return function(dispatch) {
        dispatch(loginRequest());
        return getData(API_PASS + '/login', {
                email,
                password
            }).then(res => {
            dispatch(loginSuccess(res));
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

export function loginRequest() {
    return { type: LOGIN_REQUEST };
}

export function loginSuccess(res) {
    return {
        type: LOGIN_SUCCESS,
        user: res.user,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken
    };
}

export function loginFailed(error) {
    return {
        type: LOGIN_FAILED,
        error
    };
}

export function logout(token) {
    return function(dispatch) {
        dispatch(logoutRequest());
        return getData(API_PASS + '/logout', { token }).then(res => {
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

export function logoutRequest() {
    return { type: LOGOUT_REQUEST };
}

export function logoutSuccess(message) {
    return {
        type: LOGOUT_SUCCESS,
        message
    };
}

export function logoutFailed(error) {
    return {
        type: LOGOUT_FAILED,
        error
    };
}

export function updateToken(token) {
    return function(dispatch) {
        dispatch(updateTokenRequest());
        return getData(API_PASS + '/token', { token }).then(res => {
            dispatch(updateTokenSuccess(res.message));
            return { success: true };
        }).catch(error => {
            dispatch(updateTokenFailed(error));
            return {
                success: false,
                error
            };
        });
    };
};

export function updateTokenRequest() {
    return { type: UPDATE_TOKEN_REQUEST };
}

export function updateTokenSuccess(message) {
    return {
        type: UPDATE_TOKEN_SUCCESS,
        message
    };
}

export function updateTokenFailed(error) {
    return {
        type: UPDATE_TOKEN_FAILED,
        error
    };
}
