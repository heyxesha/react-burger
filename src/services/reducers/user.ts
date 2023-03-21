import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,

    TUserActions
} from '../actions/user';

interface IUserState {
    name: string;
    email: string;
    password: string;
    isGetUserLoading: boolean;
    isGetUserFailed: boolean;
    isUpdateUserLoading: boolean;
    isUpdateUserFailed: boolean;
};

const initialState: IUserState = {
    name: '',
    email: '',
    password: '',

    isGetUserLoading: false,
    isGetUserFailed: false,

    isUpdateUserLoading: false,
    isUpdateUserFailed: false
};

export const userReducer = (state: IUserState = initialState, action: TUserActions): IUserState => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                isGetUserLoading: true,
                isGetUserFailed: false
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
                isUpdateUserFailed: false
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isUpdateUserLoading: false,
                isUpdateUserFailed: false,
                name: action.user.name,
                email: action.user.email,
                password: action.user.password || ''
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