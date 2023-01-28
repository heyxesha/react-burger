import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    ACCEPT_ADD_TO_CONSTRUCTOR,
    CANCEL_ADD_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
    ACCEPT_MOVING,
    CANCEL_MOVING,
    INCREASE_TOTAL_SUM,
    DECREASE_TOTAL_SUM
} from '../actions/selected-ingredients';

const initialState = {
    totalSum: 0,
    selectedIngredients: [],
    bun: null,
    innerIngredients: [],
    prevInnerIngredients: []
};

export const selectedIngredientsReducer = (state = initialState, action) => {
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
                innerIngredients: state.prevInnerIngredients,
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
      default: {
        return state;
      }
    }
};