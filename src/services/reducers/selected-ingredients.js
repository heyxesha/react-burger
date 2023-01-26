import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR
} from '../actions/selected-ingredients';

const initialState = {
    totalSum: 0,
    selectedIngredients: [],
    bun: null,
    innerIngredients: []
};

export const selectedIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            const innerIngredientsForAdd = [...state.innerIngredients];
            if (action.item.type !== 'bun') {
                innerIngredientsForAdd.push(action.item);
            }
            return {
                ...state,
                bun: action.item.type === 'bun' ? action.item : state.bun,
                innerIngredients: action.item.type !== 'bun' ? innerIngredientsForAdd : state.innerIngredients,
                totalSum: action.item.type === 'bun' ? state.totalSum + action.item.price * 2 : state.totalSum + action.item.price
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
                innerIngredients: action.item.type !== 'bun' ? innerIngredientsForRemove : state.innerIngredients,
                totalSum: action.item.type === 'bun' ? state.totalSum - action.item.price * 2 : state.totalSum - action.item.price
            };
      default: {
        return state;
      }
    }
};