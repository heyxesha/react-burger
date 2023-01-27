import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

    INCREASE_INGREDIENT_COUNTER,
    DECREASE_INGREDIENT_COUNTER
} from '../actions/ingredients';

const initialState = {
    ingredients: [],
    isIngredientsLoading: false,
    isIngredientsFailed: false
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                isIngredientsLoading: true,
                isIngredientsError: false
            };
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                isIngredientsLoading: false,
                isIngredientsFailed: false,
                ingredients: action.items
            };
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                isIngredientsLoading: false,
                isIngredientsFailed: true,
                ingredients: initialState.ingredients
            };
        case INCREASE_INGREDIENT_COUNTER:
            const ingredientsForIncrease = [...state.ingredients];
            const increasedIndex = ingredientsForIncrease.findIndex(item => item._id === action.id);
            const selectedCount = ingredientsForIncrease[increasedIndex].selectedCount || 0;
            ingredientsForIncrease[increasedIndex].selectedCount = selectedCount + action.value;
            return {
                ...state,
                ingredients: ingredientsForIncrease
            };
        case DECREASE_INGREDIENT_COUNTER:
            const ingredientsForDecrease = [...state.ingredients];
            const decreasedIndex = ingredientsForDecrease.findIndex(item => item._id === action.id);
            ingredientsForDecrease[decreasedIndex].selectedCount -= action.value;
            return {
                ...state,
                iingredients: ingredientsForDecrease
            };
      default: {
        return state;
      }
    }
};