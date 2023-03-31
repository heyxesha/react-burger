import { orderReducer } from './order';
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,

    RESET_VIEWED_ORDER
} from '../actions/order';

const initialState = {
    orderId: undefined,
    isCreateOrderLoading: false,
    isCreateOrderFailed: false
};

describe('Order reducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle CREATE_ORDER_REQUEST', () => {
        expect(orderReducer(undefined, {
            type: CREATE_ORDER_REQUEST
        })).toEqual({
            ...initialState,
            isCreateOrderLoading: true,
            isCreateOrderFailed: false
        });
    });

    it('should handle CREATE_ORDER_SUCCESS', () => {
        expect(orderReducer(undefined, {
            type: CREATE_ORDER_SUCCESS,
            id: 123
        })).toEqual({
            ...initialState,
            isCreateOrderLoading: false,
            isCreateOrderFailed: false,
            orderId: 123
        });
    });

    it('should handle CREATE_ORDER_FAILED', () => {
        expect(orderReducer({
            ...initialState,
            orderId: 123
        }, {
            type: CREATE_ORDER_FAILED
        })).toEqual({
            ...initialState,
            isCreateOrderLoading: false,
            isCreateOrderFailed: true,
            orderId: undefined
        });
    });

    it('should handle RESET_VIEWED_ORDER', () => {
        expect(orderReducer({
            ...initialState,
            orderId: 123
        }, {
            type: RESET_VIEWED_ORDER
        })).toEqual({
            ...initialState,
            orderId: undefined
        });
    });
});