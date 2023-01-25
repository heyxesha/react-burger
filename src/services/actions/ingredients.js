import getData from '../../utils/burger-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredients() {
    return function(dispatch) {
        dispatch({ type: GET_INGREDIENTS_REQUEST });
        getData('ingredients').then(res => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                items: res.data
            });
        }).catch(error => {
            dispatch({
                type: GET_INGREDIENTS_FAILED,
                error
            });
        });
    };
};
