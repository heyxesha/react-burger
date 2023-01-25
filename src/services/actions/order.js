import getData from '../../utils/burger-api';

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
        }).catch(error => {
            dispatch({
                type: CREATE_ORDER_FAILED,
                error
            });
        });
    };
};
