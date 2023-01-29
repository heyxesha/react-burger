export const SET_VIEWED_INGREDIENT = 'SET_VIEWED_INGREDIENT';
export const RESET_VIEWED_INGREDIENT = 'RESET_VIEWED_INGREDIENT';

export function setViewedIngredient(data) {
    return {
        type: SET_VIEWED_INGREDIENT,
        data
    };
}

export function resetViewedIngredient() {
    return { type: RESET_VIEWED_INGREDIENT };
}