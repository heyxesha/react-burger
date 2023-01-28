export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const ACCEPT_ADD_TO_CONSTRUCTOR = 'ACCEPT_ADD_TO_CONSTRUCTOR';
export const CANCEL_ADD_TO_CONSTRUCTOR = 'CANCEL_ADD_TO_CONSTRUCTOR';

export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';

export const MOVE_INGREDIENT_IN_CONSTRUCTOR = 'MOVE_INGREDIENT_IN_CONSTRUCTOR';
export const ACCEPT_MOVING = 'ACCEPT_MOVING';
export const CANCEL_MOVING = 'CANCEL_MOVING';

export const INCREASE_TOTAL_SUM = 'INCREASE_TOTAL_SUM';
export const DECREASE_TOTAL_SUM = 'DECREASE_TOTAL_SUM';

export const CLEAN_CONSTRUCTOR = 'CLEAN_CONSTRUCTOR';

export function addIngredientToConstructor(item, to) {
    return {
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        item,
        to
    };
}

export function acceptAddToConstructor() {
    return { type: ACCEPT_ADD_TO_CONSTRUCTOR };
}

export function cancelAddToConstructor() {
    return { type: CANCEL_ADD_TO_CONSTRUCTOR };
}

export function removeIngredientFromConstructor(item) {
    return {
        type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
        item
    };
}

export function moveIngredientInConstructor(from, to) {
    return {
        type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
        from,
        to
    };
}

export function acceptMoving() {
    return { type: ACCEPT_MOVING };
}

export function cancelMoving() {
    return { type: CANCEL_MOVING };
}

export function increaceTotalSum(value) {
    return {
        type: INCREASE_TOTAL_SUM,
        value
    };
}

export function decreaseTotalSum(value) {
    return {
        type: DECREASE_TOTAL_SUM,
        value
    };
}

export function cleanConstructor() {
    return { type: CLEAN_CONSTRUCTOR };
}