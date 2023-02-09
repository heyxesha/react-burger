import getData from '../../utils/burger-api';
import { cleanConstructor } from './selected-ingredients';
import { resetSelectedIngredients } from './ingredients';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';
export const RESET_VIEWED_ORDER = 'RESET_VIEWED_ORDER';

export function createOrder(ingredients) {
    return function(dispatch) {
        dispatch(createOrderRequest());
        return getData('orders', { ingredients }).then(res => {
            dispatch(createOrderSuccess(res.order.number));
            dispatch(cleanConstructor());
            dispatch(resetSelectedIngredients());
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

export function createOrderRequest() {
    return { type: CREATE_ORDER_REQUEST };
}

export function createOrderSuccess(id) {
    return {
        type: CREATE_ORDER_SUCCESS,
        id
    };
}

export function createOrderFailed(error) {
    return {
        type: CREATE_ORDER_FAILED,
        error
    };
}

export function resetViewedOrder() {
    return { type: RESET_VIEWED_ORDER };
}