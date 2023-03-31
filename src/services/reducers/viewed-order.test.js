import { viewedOrderReducer } from "./viewed-order";
import {
    RESET_VIEWED_ORDER,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    SET_VIEWED_ORDER
 } from "../actions/viewed-order";
 import { order } from "../../utils/fake-data";

const initialState = {
    order: null,
    isGetOrderLoading: false,
    isGetOrderFailed: false
};

describe('Viewed order reducer', () => {
    it('should return the initial state', () => {
        expect(viewedOrderReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle RESET_VIEWED_ORDER', () => {
        expect(viewedOrderReducer(undefined, {
            type: RESET_VIEWED_ORDER
        })).toEqual(initialState);
    });
    

    it('should handle GET_ORDER_REQUEST', () => {
        expect(viewedOrderReducer(undefined, {
            type: GET_ORDER_REQUEST
        })).toEqual({
            order: null,
            isGetOrderLoading: true,
            isGetOrderFailed: false
        });
    });

    it('should handle GET_ORDER_SUCCESS', () => {
        expect(viewedOrderReducer(undefined, {
            type: GET_ORDER_SUCCESS,
            data: order
        })).toEqual({
            isGetOrderLoading: false,
            isGetOrderFailed: false,
            order
        });
    });

    it('should handle SET_VIEWED_ORDER', () => {
        expect(viewedOrderReducer(undefined, {
            type: SET_VIEWED_ORDER,
            data: order
        })).toEqual({
            ...initialState,
            order
        });
    });

    it('should handle GET_ORDER_FAILED', () => {
        expect(viewedOrderReducer(undefined, {
            type: GET_ORDER_FAILED
        })).toEqual({
            ...initialState,
            isGetOrderLoading: false,
            isGetOrderFailed: true
        });
    });
});