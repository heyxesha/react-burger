import getData from '../../utils/burger-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const INCREASE_INGREDIENT_COUNTER = 'INCREASE_INGREDIENT_COUNTER';
export const DECREASE_INGREDIENT_COUNTER = 'DECREASE_INGREDIENT_COUNTER';

export const RESET_SELECTED_INGREDIENTS = 'RESET_SELECTED_INGREDIENTS';

export function getIngredients() {
    return function(dispatch) {
        dispatch(getIngredientsRequest());
        getData({
            path: 'ingredients',
            method: 'GET'
        }).then(res => {
            dispatch(getIngredientsSuccess(res.data));
        }).catch(error => {
            dispatch({
                type: GET_INGREDIENTS_FAILED,
                error
            });
        });
    };
};

export function getIngredientsRequest() {
    return { type: GET_INGREDIENTS_REQUEST };
}

export function getIngredientsSuccess(items) {
    return {
        type: GET_INGREDIENTS_SUCCESS,
        items
    };
}

export function getIngredientsFailed(error) {
    return {
        type: GET_INGREDIENTS_FAILED,
        error
    };
}

export function increaseIngredientCounter(id, value) {
    return {
        type: INCREASE_INGREDIENT_COUNTER,
        id,
        value
    };
}

export function decreaseIngredientCounter(id, value) {
    return {
        type: DECREASE_INGREDIENT_COUNTER,
        id,
        value
    };
}

export function resetSelectedIngredients() {
    return { type: RESET_SELECTED_INGREDIENTS };
}

