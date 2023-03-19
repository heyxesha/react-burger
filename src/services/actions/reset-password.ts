import getData from '../../utils/burger-api';

import { TAppThunk } from '../../store';

import IActionResponseData from '../../interfaces/action-response-data';

interface ISendEmailRequestAction {
    readonly type: typeof SEND_EMAIL_REQUEST;
}

interface ISendEmailSuccessAction {
    readonly type: typeof SEND_EMAIL_SUCCESS;
    readonly message: string;
}

interface ISendEmailFailedAction {
    readonly type: typeof SEND_EMAIL_FAILED;
    readonly error: Error | string;
}

interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    readonly message: string;
}

interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
    readonly error: Error | string;
}

export type TResetPasswordActions =
      ISendEmailRequestAction
    | ISendEmailSuccessAction
    | ISendEmailFailedAction
    
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction;

export const SEND_EMAIL_REQUEST: 'SEND_EMAIL_REQUEST' = 'SEND_EMAIL_REQUEST';
export const SEND_EMAIL_SUCCESS: 'SEND_EMAIL_SUCCESS' = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAILED:'SEND_EMAIL_FAILED' = 'SEND_EMAIL_FAILED';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

const RESET_PASSWORD_PATH = 'password-reset';

export function sendEmail(email: string): TAppThunk<Promise<IActionResponseData>> {
    return function(dispatch) {
        dispatch(sendEmailRequest());
        return getData({
            path: RESET_PASSWORD_PATH,
            method: 'POST',
            bodyParams: { email }
        }).then(res => {
            if (res.success) {
                dispatch(sendEmailSuccess(res.message));
                return { success: true };
            } else {
                dispatch(sendEmailFailed(res.message));
                return {
                    success: false,
                    error: res.message
                };
            }
        }).catch(error => {
            dispatch(sendEmailFailed(error));
            return {
                success: false,
                error
            };
        });
    };
};

export function sendEmailRequest(): ISendEmailRequestAction {
    return { type: SEND_EMAIL_REQUEST };
}

export function sendEmailSuccess(message: string): ISendEmailSuccessAction {
    return {
        type: SEND_EMAIL_SUCCESS,
        message
    };
}

export function sendEmailFailed(error: Error | string): ISendEmailFailedAction {
    return {
        type: SEND_EMAIL_FAILED,
        error
    };
}

export function resetPassword(password: string, token: string): TAppThunk<Promise<IActionResponseData>> {
    return function(dispatch) {
        dispatch(resetPasswordRequest());
        return getData({
            path: RESET_PASSWORD_PATH + '/reset',
            method: 'POST',
            bodyParams: {
                password,
                token
            }
        }).then(res => {
            if (res.success) {
                dispatch(resetPasswordSuccess(res.message));
                return { success: true };
            } else {
                dispatch(resetPasswordFailed(res.message));
                return {
                    success: false,
                    error: res.message
                };
            }
        }).catch(error => {
            dispatch(resetPasswordFailed(error));
            return {
                success: false,
                error
            };
        });
    };
};

export function resetPasswordRequest(): IResetPasswordRequestAction {
    return { type: RESET_PASSWORD_REQUEST };
}

export function resetPasswordSuccess(message: string): IResetPasswordSuccessAction {
    return {
        type: RESET_PASSWORD_SUCCESS,
        message
    };
}

export function resetPasswordFailed(error: Error | string): IResetPasswordFailedAction {
    return {
        type: RESET_PASSWORD_FAILED,
        error
    };
}