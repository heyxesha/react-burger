import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    ACCEPT_ADD_TO_CONSTRUCTOR,
    CANCEL_ADD_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
    ACCEPT_MOVING,
    CANCEL_MOVING,
    INCREASE_TOTAL_SUM,
    DECREASE_TOTAL_SUM,
    CLEAN_CONSTRUCTOR,

    ISelectedIngredientsActions
} from '../actions/selected-ingredients';
import ISelectedIngredient from '../../interfaces/selected-ingredient';

interface ISelectedIngredientsState {
    totalSum: number;
    bun: ISelectedIngredient | null;
    innerIngredients: ISelectedIngredient[];
    prevInnerIngredients: ISelectedIngredient[];
};

const initialState: ISelectedIngredientsState = {
    totalSum: 0,
    bun: null,
    innerIngredients: [],
    prevInnerIngredients: []
};

export const selectedIngredientsReducer = (
    state: ISelectedIngredientsState = initialState,
    action: ISelectedIngredientsActions): ISelectedIngredientsState  => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            const innerIngredientsForAdd = [...state.innerIngredients];
            if (action.item.type !== 'bun') {
                innerIngredientsForAdd.splice(action.to, 0, action.item);
            }
            return {
                ...state,
                bun: action.item.type === 'bun' ? action.item : state.bun,
                innerIngredients: action.item.type !== 'bun' ? innerIngredientsForAdd : state.innerIngredients,
                prevInnerIngredients: state.prevInnerIngredients.length ? state.prevInnerIngredients : state.innerIngredients
            };
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
            const innerIngredientsForRemove = [...state.innerIngredients];
            if (action.item.type !== 'bun') {
                const removedIndex = innerIngredientsForRemove.findIndex(item => item.constructorId === action.item.constructorId);
                innerIngredientsForRemove.splice(removedIndex, 1);
            }
            return {
                ...state,
                bun: action.item.type === 'bun' ? null : state.bun,
                innerIngredients: action.item.type !== 'bun' ? innerIngredientsForRemove : state.innerIngredients
            };
        case MOVE_INGREDIENT_IN_CONSTRUCTOR:
            const innerIngredientsForMove = [...state.innerIngredients];
            const item = innerIngredientsForMove.splice(action.from, 1)[0];
            innerIngredientsForMove.splice(action.to, 0, item);
            return {
                ...state,
                innerIngredients: innerIngredientsForMove,
                prevInnerIngredients: state.prevInnerIngredients.length ? state.prevInnerIngredients : state.innerIngredients
            };
        case ACCEPT_MOVING:
            return {
                ...state,
                prevInnerIngredients: []
            };
        case CANCEL_MOVING:
        case CANCEL_ADD_TO_CONSTRUCTOR:
            return {
                ...state,
                innerIngredients: state.prevInnerIngredients.length ? state.prevInnerIngredients : state.innerIngredients,
                prevInnerIngredients: []
            };
        case INCREASE_TOTAL_SUM:
            return {
                ...state,
                totalSum: state.totalSum + action.value
            };
        case DECREASE_TOTAL_SUM:
            return {
                ...state,
                totalSum: state.totalSum - action.value
            };
        case ACCEPT_ADD_TO_CONSTRUCTOR:
            const index = state.innerIngredients.findIndex(item => item.isDragging);
            if (index !== -1) {
                delete state.innerIngredients[index].isDragging;
            }
            return {
                ...state,
                innerIngredients: state.innerIngredients,
                prevInnerIngredients: []
            };
        case CLEAN_CONSTRUCTOR:
            return initialState;
        default: {
            return state;
        }
    }
};