import getData from '../../utils/burger-api';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export function getUser(token) {
    return function(dispatch) {
        dispatch(getUserRequest());
        return getData({
            path: 'auth/user',
            method: 'GET',
            headers: { Authorization: token }
        }).then(res => {
            dispatch(getUserSuccess(res.user));
            return { success: true };
        }).catch(error => {
            dispatch(getUserFailed(error));
            return {
                success: false,
                error
            };
        });
    };
};

export function getUserRequest() {
    return { type: GET_USER_REQUEST };
}

export function getUserSuccess(user) {
    return {
        type: GET_USER_SUCCESS,
        user
    };
}

export function getUserFailed(error) {
    return {
        type: GET_USER_FAILED,
        error
    };
}

export function updateUser(token, name, email, password) {
    return function(dispatch) {
        dispatch(updateUserRequest());
        return getData({
            path: 'auth/user',
            method: 'PATCH',
            headers: { Authorization: token },
            bodyParams: {
                name,
                email,
                password
            }
        }).then(res => {
            dispatch(updateUserSuccess({
                ...res.user,
                password
            }));
            return { success: true };
        }).catch(error => {
            dispatch(updateUserFailed(error));
            return {
                success: false,
                error
            };
        });
    };
};

export function updateUserRequest() {
    return { type: UPDATE_USER_REQUEST };
}

export function updateUserSuccess(user) {
    return {
        type: UPDATE_USER_SUCCESS,
        user
    };
}

export function updateUserFailed(error) {
    return {
        type: UPDATE_USER_FAILED,
        error
    };
}

