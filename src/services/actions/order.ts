import getData from '../../utils/burger-api';

import { TAppThunk } from '../../store';
import IActionResponseData from '../../interfaces/action-response-data';

interface ICreateOrderRequestAction {
    readonly type: typeof CREATE_ORDER_REQUEST;
}

interface ICreateOrderSuccessAction {
    readonly type: typeof CREATE_ORDER_SUCCESS;
    readonly id: number;
}

interface ICreateOrderFailedAction {
    readonly type: typeof CREATE_ORDER_FAILED;
    readonly error: Error;
}

interface IResetViewedOrderAction {
    readonly type: typeof RESET_VIEWED_ORDER;
}

export type IOrderActions =
      ICreateOrderRequestAction
    | ICreateOrderSuccessAction
    | ICreateOrderFailedAction
    | IResetViewedOrderAction;

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED: 'CREATE_ORDER_FAILED' = 'CREATE_ORDER_FAILED';
export const RESET_VIEWED_ORDER: 'RESET_VIEWED_ORDER' = 'RESET_VIEWED_ORDER';

export function createOrder(ingredients: string[], token: string): TAppThunk<Promise<IActionResponseData>> {
    return function(dispatch) {
        dispatch(createOrderRequest());
        return getData({
            path: 'orders',
            method: 'POST',
            bodyParams: { ingredients },
            headers: { Authorization: token }
        }).then(res => {
            dispatch(createOrderSuccess(res.order.number));
            return { success: true };
        }).catch(error => {
            dispatch(createOrderFailed(error));
            return {
                success: false,
                error
            };
        });
    };
};

export function createOrderRequest(): ICreateOrderRequestAction {
    return { type: CREATE_ORDER_REQUEST };
}

export function createOrderSuccess(id: number): ICreateOrderSuccessAction {
    return {
        type: CREATE_ORDER_SUCCESS,
        id
    };
}

export function createOrderFailed(error: Error): ICreateOrderFailedAction {
    return {
        type: CREATE_ORDER_FAILED,
        error
    };
}

export function resetViewedOrder() {
    return { type: RESET_VIEWED_ORDER };
}