export const SET_PREV_SECURED_URL = 'SET_PREV_SECURED_URL';
export const SET_MOVE_FROM_FORGOT_PASSWORD_STATUS = 'SET_MOVE_FROM_FORGOT_PASSWORD_STATUS';

export function setUnsecuredUrl(url) {
    return {
        type: SET_PREV_SECURED_URL,
        url
    };
}

export function setMoveFromForgotPasswordStatus(moveFromForgotPassword) {
    return {
        type: SET_MOVE_FROM_FORGOT_PASSWORD_STATUS,
        moveFromForgotPassword
    };
}