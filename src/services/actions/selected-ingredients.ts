import ISelectedIngredient from '../../interfaces/selected-ingredient';

interface IAddIngredientToConstructorAction {
    readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
    readonly item: ISelectedIngredient;
    readonly to: number;
}

interface IAcceptAddToConstructorAction {
    readonly type: typeof ACCEPT_ADD_TO_CONSTRUCTOR;
}

interface ICancelAddToConstructorAction {
    readonly type: typeof CANCEL_ADD_TO_CONSTRUCTOR;
}

interface IRemoveIngredientFromConstructorAction {
    readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
    readonly item: ISelectedIngredient;
}

interface IMoveIngredientInConstructorAction {
    readonly type: typeof MOVE_INGREDIENT_IN_CONSTRUCTOR;
    readonly from: number;
    readonly to: number;
}

interface IAcceptMovingAction {
    readonly type: typeof ACCEPT_MOVING;
}

interface ICancelMovingAction {
    readonly type: typeof CANCEL_MOVING;
}

interface IIncreaceTotalSumAction {
    readonly type: typeof INCREASE_TOTAL_SUM;
    readonly value: number;
}

interface IDecreaseTotalSumAction {
    readonly type: typeof DECREASE_TOTAL_SUM;
    readonly value: number;
}

interface ICleanConstructorAction {
    readonly type: typeof CLEAN_CONSTRUCTOR;
}

export type ISelectedIngredientsActions =
      IAddIngredientToConstructorAction
    | IAcceptAddToConstructorAction
    | ICancelAddToConstructorAction
    | IRemoveIngredientFromConstructorAction
    | IMoveIngredientInConstructorAction
    | IAcceptMovingAction
    | ICancelMovingAction
    | IIncreaceTotalSumAction
    | IDecreaseTotalSumAction
    | ICleanConstructorAction;

export const ADD_INGREDIENT_TO_CONSTRUCTOR: 'ADD_INGREDIENT_TO_CONSTRUCTOR' = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const ACCEPT_ADD_TO_CONSTRUCTOR: 'ACCEPT_ADD_TO_CONSTRUCTOR' = 'ACCEPT_ADD_TO_CONSTRUCTOR';
export const CANCEL_ADD_TO_CONSTRUCTOR: 'CANCEL_ADD_TO_CONSTRUCTOR' = 'CANCEL_ADD_TO_CONSTRUCTOR';

export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR: 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR' = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';

export const MOVE_INGREDIENT_IN_CONSTRUCTOR: 'MOVE_INGREDIENT_IN_CONSTRUCTOR' = 'MOVE_INGREDIENT_IN_CONSTRUCTOR';
export const ACCEPT_MOVING: 'ACCEPT_MOVING' = 'ACCEPT_MOVING';
export const CANCEL_MOVING: 'CANCEL_MOVING' = 'CANCEL_MOVING';

export const INCREASE_TOTAL_SUM: 'INCREASE_TOTAL_SUM' = 'INCREASE_TOTAL_SUM';
export const DECREASE_TOTAL_SUM: 'DECREASE_TOTAL_SUM' = 'DECREASE_TOTAL_SUM';

export const CLEAN_CONSTRUCTOR: 'CLEAN_CONSTRUCTOR' = 'CLEAN_CONSTRUCTOR';

export function addIngredientToConstructor(item: ISelectedIngredient, to: number): IAddIngredientToConstructorAction {
    return {
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        item,
        to
    };
}

export function acceptAddToConstructor(): IAcceptAddToConstructorAction {
    return { type: ACCEPT_ADD_TO_CONSTRUCTOR };
}

export function cancelAddToConstructor(): ICancelAddToConstructorAction {
    return { type: CANCEL_ADD_TO_CONSTRUCTOR };
}

export function removeIngredientFromConstructor(item: ISelectedIngredient): IRemoveIngredientFromConstructorAction {
    return {
        type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
        item
    };
}

export function moveIngredientInConstructor(from: number, to: number): IMoveIngredientInConstructorAction {
    return {
        type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
        from,
        to
    };
}

export function acceptMoving(): IAcceptMovingAction {
    return { type: ACCEPT_MOVING };
}

export function cancelMoving(): ICancelMovingAction {
    return { type: CANCEL_MOVING };
}

export function increaceTotalSum(value: number): IIncreaceTotalSumAction {
    return {
        type: INCREASE_TOTAL_SUM,
        value
    };
}

export function decreaseTotalSum(value: number): IDecreaseTotalSumAction {
    return {
        type: DECREASE_TOTAL_SUM,
        value
    };
}

export function cleanConstructor(): ICleanConstructorAction {
    return { type: CLEAN_CONSTRUCTOR };
}