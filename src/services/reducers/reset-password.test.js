import { resetPasswordReducer } from "./reset-password";
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

describe('Reset password reducer', () => {
    it('should return the initial state', () => {
        expect(resetPasswordReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle SEND_EMAIL_REQUEST', () => {
        expect(resetPasswordReducer(undefined, {
            type: SEND_EMAIL_REQUEST
        })).toEqual({
            ...initialState,
            isSendEmailLoading: true,
            isSendEmailFailed: false
        });
    });

    it('should handle SEND_EMAIL_SUCCESS', () => {
        expect(resetPasswordReducer(undefined, {
            type: SEND_EMAIL_SUCCESS
        })).toEqual({
            ...initialState,
            isSendEmailLoading: false,
            isSendEmailFailed: false
        });
    });

    it('should handle SEND_EMAIL_FAILED', () => {
        expect(resetPasswordReducer(undefined, {
            type: SEND_EMAIL_FAILED
        })).toEqual({
            ...initialState,
            isSendEmailLoading: false,
            isSendEmailFailed: true
        });
    });

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(resetPasswordReducer(undefined, {
            type: RESET_PASSWORD_REQUEST
        })).toEqual({
            ...initialState,
            isResetPasswordLoading: true,
            isSendEmailFailed: false
        });
    });

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(resetPasswordReducer(undefined, {
            type: RESET_PASSWORD_SUCCESS
        })).toEqual({
            ...initialState,
            isResetPasswordLoading: false,
            isResetPasswordFailed: false
        });
    });

    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(resetPasswordReducer(undefined, {
            type: RESET_PASSWORD_FAILED
        })).toEqual({
            ...initialState,
            isResetPasswordLoading: false,
            isResetPasswordFailed: true
        });
    });
});