import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED
} from '../actions/user';

const initialState = {
    name: '',
    email: '',
    password: '',

    isGetUserLoading: false,
    isGetUserFailed: false,

    isUpdateUserLoading: false,
    isUpdateUserFailed: false
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                isGetUserLoading: true,
                isGetUserError: false
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                isGetUserLoading: false,
                isGetUserFailed: false,
                name: action.user.name,
                email: action.user.email
            };
        case GET_USER_FAILED:
            return {
                ...state,
                isGetUserLoading: false,
                isGetUserFailed: true
            };
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                isUpdateUserLoading: true,
                isUpdateUserError: false
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isUpdateUserLoading: false,
                isUpdateUserFailed: false,
                name: action.user.name,
                email: action.user.email,
                password: action.user.password
            };
        case UPDATE_USER_FAILED:
            return {
                ...state,
                isUpdateUserLoading: false,
                isUpdateUserFailed: true
            };
        default: {
            return state;
        }
    }
};