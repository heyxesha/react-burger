import IIngredient from "../../interfaces/ingredient";

interface ISetViewedIngredientAction {
    readonly type: typeof SET_VIEWED_INGREDIENT;
    readonly data: IIngredient;
}

interface IResetViewedIngredientAction {
    readonly type: typeof RESET_VIEWED_INGREDIENT;
}

export type TViewedIngredientActions = ISetViewedIngredientAction | IResetViewedIngredientAction;

export const SET_VIEWED_INGREDIENT: 'SET_VIEWED_INGREDIENT' = 'SET_VIEWED_INGREDIENT';
export const RESET_VIEWED_INGREDIENT: 'RESET_VIEWED_INGREDIENT' = 'RESET_VIEWED_INGREDIENT';

export function setViewedIngredient(data: IIngredient): ISetViewedIngredientAction {
    return {
        type: SET_VIEWED_INGREDIENT,
        data
    };
}

export function resetViewedIngredient(): IResetViewedIngredientAction {
    return { type: RESET_VIEWED_INGREDIENT };
}