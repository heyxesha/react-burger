import {
    SET_VIEWED_ORDER,
    RESET_VIEWED_ORDER,

    GET_ORDER_FAILED,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,

    TViewedOrderActions
} from '../actions/viewed-order';
import IOrder from '../../interfaces/order';

interface IViewedOrderState {
    order: IOrder | null;
    isGetOrderLoading: boolean,
    isGetOrderFailed: boolean
}

const initialState: IViewedOrderState = {
    order: null,

    isGetOrderLoading: false,
    isGetOrderFailed: false
};

export const viewedOrderReducer = (
    state: IViewedOrderState = initialState,
    action: TViewedOrderActions): IViewedOrderState  => {
    switch (action.type) {
        case SET_VIEWED_ORDER:
            return {
                ...state,
                order: action.data
            };
        case RESET_VIEWED_ORDER:
            return initialState;
        case GET_ORDER_REQUEST:
            return {
                ...state,
                isGetOrderLoading: true,
                isGetOrderFailed: false
            };
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                isGetOrderLoading: false,
                isGetOrderFailed: false,
                order: action.data
            };
        case GET_ORDER_FAILED:
            return {
                ...state,
                isGetOrderLoading: false,
                isGetOrderFailed: true
            };
        default: {
            return state;
        }
    }
};