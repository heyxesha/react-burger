import {
    SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_FAILED,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED
} from '../actions/reset-password';

const initialState = {
    isSendEmailLoading: false,
    isSendEmailFailed: false,

    isResetPasswordLoading: false,
    isResetPasswordFailed: false
};

export const resetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_EMAIL_REQUEST:
            return {
                ...state,
                isSendEmailLoading: true,
                isSendEmailError: false
            };
        case SEND_EMAIL_SUCCESS:
            return {
                ...state,
                isSendEmailLoading: false,
                isSendEmailFailed: false
            };
        case SEND_EMAIL_FAILED:
            return {
                ...state,
                isSendEmailLoading: false,
                isSendEmailFailed: true
            };
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isResetPasswordLoading: true,
                isSendEmailError: false
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isResetPasswordLoading: false,
                isResetPasswordFailed: false
            };
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                isResetPasswordLoading: false,
                isResetPasswordFailed: true
            };
        default: {
            return state;
        }
    }
};