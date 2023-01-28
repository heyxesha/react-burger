import getData from '../../utils/burger-api';
import { CLEAN_CONSTRUCTOR } from './selected-ingredients';
import { RESET_SELECTED_INGREDIENTS } from './ingredients';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';
export const RESET_VIEWED_ORDER = 'RESET_VIEWED_ORDER';

export function createOrder(ingredients) {
    return function(dispatch) {
        dispatch({ type: CREATE_ORDER_REQUEST });
        return getData('orders', { ingredients }).then(res => {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                id: res.order.number
            });
            dispatch({ type: CLEAN_CONSTRUCTOR });
            dispatch({ type: RESET_SELECTED_INGREDIENTS });
        }).catch(error => {
            dispatch({
                type: CREATE_ORDER_FAILED,
                error
            });
        });
    };
};
