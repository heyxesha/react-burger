import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED
} from '../actions/user';
import { userReducer } from "./user";

const initialState = {
    name: '',
    email: '',
    password: '',
    isGetUserLoading: false,
    isGetUserFailed: false,
    isUpdateUserLoading: false,
    isUpdateUserFailed: false
};

const user = {
    email: 'test@mail.ru',
    name: 'user'
};

describe('User reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_USER_REQUEST', () => {
        expect(userReducer(undefined, {
            type: GET_USER_REQUEST
        })).toEqual({
            ...initialState,
            isGetUserLoading: true,
            isGetUserFailed: false
        });
    });
    
    it('should handle GET_USER_SUCCESS', () => {
        expect(userReducer(undefined, {
            type: GET_USER_SUCCESS,
            user
        })).toEqual({
            ...initialState,
            isGetUserLoading: false,
            isGetUserFailed: false,
            name: user.name,
            email: user.email
        });
    });

    it('should handle GET_USER_FAILED', () => {
        expect(userReducer(undefined, {
            type: GET_USER_FAILED,
            error: 'error'
        })).toEqual({
            ...initialState,
            isGetUserLoading: false,
            isGetUserFailed: true
        });
    });

    it('should handle UPDATE_USER_REQUEST', () => {
        expect(userReducer(undefined, {
            type: UPDATE_USER_REQUEST
        })).toEqual({
            ...initialState,
            isUpdateUserLoading: true,
            isUpdateUserFailed: false
        });
    });

    it('should handle UPDATE_USER_SUCCESS with password', () => {
        expect(userReducer(undefined, {
            type: UPDATE_USER_SUCCESS,
            user: {
                ...user,
                password: 'password'
            }
        })).toEqual({
            ...initialState,
            isUpdateUserLoading: false,
            isUpdateUserFailed: false,
            name: user.name,
            email: user.email,
            password: 'password'
        });
    });

    it('should handle UPDATE_USER_SUCCESS without password', () => {
        expect(userReducer(undefined, {
            type: UPDATE_USER_SUCCESS,
            user
        })).toEqual({
            ...initialState,
            isUpdateUserLoading: false,
            isUpdateUserFailed: false,
            name: user.name,
            email: user.email,
            password: ''
        });
    });

    it('should handle UPDATE_USER_FAILED', () => {
        expect(userReducer(undefined, {
            type: UPDATE_USER_FAILED,
            error: 'error'
        })).toEqual({
            ...initialState,
            isUpdateUserLoading: false,
            isUpdateUserFailed: true
        });
    });
});