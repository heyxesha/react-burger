import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    INCREASE_INGREDIENT_COUNTER,
    DECREASE_INGREDIENT_COUNTER,
    RESET_SELECTED_INGREDIENTS,

    TIngtedientsActions
} from '../actions/ingredients';
import IIngredient from '../../interfaces/ingredient';

interface IIngredientsState {
    ingredients: IIngredient[];
    isIngredientsLoading: boolean;
    isIngredientsFailed: boolean;
};

const initialState: IIngredientsState = {
    ingredients: [],
    isIngredientsLoading: false,
    isIngredientsFailed: false
};

export const ingredientsReducer = (state: IIngredientsState = initialState, action: TIngtedientsActions): IIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                isIngredientsLoading: true,
                isIngredientsFailed: false
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
            const currentSelectedCount =  ingredientsForDecrease[decreasedIndex].selectedCount || 0;
            ingredientsForDecrease[decreasedIndex].selectedCount = currentSelectedCount - action.value;
            return {
                ...state,
                ingredients: ingredientsForDecrease
            };
        case RESET_SELECTED_INGREDIENTS:
            const ingredientsForReset = [...state.ingredients];
            ingredientsForReset.forEach(item => item.selectedCount = 0);
            return {
                ...state,
                ingredients: ingredientsForReset
            };
        default: {
            return state;
        }
    }
};