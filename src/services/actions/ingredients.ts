import getData from '../../utils/burger-api';

import { TAppThunk } from '../../store';
import IIngredient from '../../interfaces/ingredient';

interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly items: IIngredient[];
}

interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
    readonly error: Error;
}

interface IIncreaseIngredientCounterAction {
    readonly type: typeof INCREASE_INGREDIENT_COUNTER;
    readonly id: string;
    readonly value: number;
}

interface IDecreaseIngredientCounterAction {
    readonly type: typeof DECREASE_INGREDIENT_COUNTER;
    readonly id: string;
    readonly value: number;
}

interface IResetSelectedIngredientsAction {
    readonly type: typeof RESET_SELECTED_INGREDIENTS;
}

export type TIngtedientsActions =
      IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction
    | IIncreaseIngredientCounterAction
    | IDecreaseIngredientCounterAction
    | IResetSelectedIngredientsAction;

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const INCREASE_INGREDIENT_COUNTER:'INCREASE_INGREDIENT_COUNTER' = 'INCREASE_INGREDIENT_COUNTER';
export const DECREASE_INGREDIENT_COUNTER: 'DECREASE_INGREDIENT_COUNTER' = 'DECREASE_INGREDIENT_COUNTER';

export const RESET_SELECTED_INGREDIENTS: 'RESET_SELECTED_INGREDIENTS' = 'RESET_SELECTED_INGREDIENTS';

export function getIngredients(): TAppThunk {
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

export function getIngredientsRequest(): IGetIngredientsRequestAction {
    return { type: GET_INGREDIENTS_REQUEST };
}

export function getIngredientsSuccess(items: IIngredient[]): IGetIngredientsSuccessAction {
    return {
        type: GET_INGREDIENTS_SUCCESS,
        items
    };
}

export function getIngredientsFailed(error: Error): IGetIngredientsFailedAction {
    return {
        type: GET_INGREDIENTS_FAILED,
        error
    };
}

export function increaseIngredientCounter(id: string, value: number): IIncreaseIngredientCounterAction {
    return {
        type: INCREASE_INGREDIENT_COUNTER,
        id,
        value
    };
}

export function decreaseIngredientCounter(id: string, value: number): IDecreaseIngredientCounterAction {
    return {
        type: DECREASE_INGREDIENT_COUNTER,
        id,
        value
    };
}

export function resetSelectedIngredients() {
    return { type: RESET_SELECTED_INGREDIENTS };
}

