import getData from '../../utils/burger-api';

import { TAppThunk } from '../../store';
import IUser from '../../interfaces/user';
import IActionResponseData from '../../interfaces/action-response-data';

interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly user: IUser;
}

interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
    readonly error: Error;
}

interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}

interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
    readonly user: IUser;
}

interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
    readonly error: Error;
}

export type TUserActions =
    IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
    
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailedAction;

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED';

export function getUser(token: string): TAppThunk<Promise<IActionResponseData>> {
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

export function getUserRequest(): IGetUserRequestAction {
    return { type: GET_USER_REQUEST };
}

export function getUserSuccess(user: IUser): IGetUserSuccessAction {
    return {
        type: GET_USER_SUCCESS,
        user
    };
}

export function getUserFailed(error: Error): IGetUserFailedAction {
    return {
        type: GET_USER_FAILED,
        error
    };
}

export function updateUser(token: string, name: string, email: string, password: string | undefined): TAppThunk<Promise<IActionResponseData>> {
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

export function updateUserRequest(): IUpdateUserRequestAction {
    return { type: UPDATE_USER_REQUEST };
}

export function updateUserSuccess(user: IUser): IUpdateUserSuccessAction {
    return {
        type: UPDATE_USER_SUCCESS,
        user
    };
}

export function updateUserFailed(error: Error): IUpdateUserFailedAction {
    return {
        type: UPDATE_USER_FAILED,
        error
    };
}

