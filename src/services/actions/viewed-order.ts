import { TAppThunk } from '../../store';
import IOrder from '../../interfaces/order';
import IActionResponseData from '../../interfaces/action-response-data';
import getData from '../../utils/burger-api';

interface ISetViewedOrderAction {
    readonly type: typeof SET_VIEWED_ORDER;
    readonly data: IOrder;
}

interface IResetViewedOrderAction {
    readonly type: typeof RESET_VIEWED_ORDER;
}

interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly data: IOrder;
}

interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
    readonly eror: Error;
}

export type TViewedOrderActions =
      ISetViewedOrderAction
    | IResetViewedOrderAction
    | IGetOrderRequestAction
    | IGetOrderSuccessAction
    | IGetOrderFailedAction;

export const SET_VIEWED_ORDER: 'SET_VIEWED_ORDER' = 'SET_VIEWED_ORDER';
export const RESET_VIEWED_ORDER: 'RESET_VIEWED_ORDER' = 'RESET_VIEWED_ORDER';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export function setViewedOrder(data: IOrder): ISetViewedOrderAction {
    return {
        type: SET_VIEWED_ORDER,
        data
    };
}

export function resetViewedOrder(): IResetViewedOrderAction {
    return { type: RESET_VIEWED_ORDER };
}

export function getOrder(id: string): TAppThunk<Promise<IActionResponseData>> {
    return function(dispatch) {
        dispatch(getOrderRequest());
        return getData({
            path: `orders/${id}`,
            method: 'GET'
        }).then(res => {
            dispatch(getOrderSuccess(res.orders[0]));
            return { success: true };
        }).catch(error => {
            dispatch(getOrderFailed(error));
            return {
                success: false,
                error
            };
        });
    };
};

export function getOrderRequest(): IGetOrderRequestAction {
    return { type: GET_ORDER_REQUEST };
}

export function getOrderSuccess(data: IOrder): IGetOrderSuccessAction {
    return {
        type: GET_ORDER_SUCCESS,
        data
    };
}

export function getOrderFailed(eror: Error): IGetOrderFailedAction {
    return {
        type: GET_ORDER_FAILED,
        eror
    };
}