import {
    SET_PREV_SECURED_URL,
    SET_MOVE_FROM_FORGOT_PASSWORD_STATUS
} from '../actions/router';

const initialState = {
    prevSecuredUrl: '',
    moveFromForgotPassword: false
};

export const routerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PREV_SECURED_URL:
            return {
                ...state,
                prevSecuredUrl: action.url
            };
        case SET_MOVE_FROM_FORGOT_PASSWORD_STATUS:
            return {
                ...state,
                moveFromForgotPassword: action.moveFromForgotPassword
            };
        default: {
            return state;
        }
    }
};