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

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                isCreateOrderLoading: true,
                isCreateOrderError: false
            };
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                isCreateOrderLoading: false,
                isCreateOrderFailed: false,
                orderId: action.id
            };
        case CREATE_ORDER_FAILED:
            return {
                ...state,
                isCreateOrderLoading: false,
                isCreateOrderFailed: true,
                orderId: initialState.orderId
            };
        case RESET_VIEWED_ORDER:
            return {
                ...state,
                orderId: initialState.orderId
            };
        default: {
            return state;
        }
    }
};