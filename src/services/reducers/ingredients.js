import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../actions/ingredients';

import { data } from '../../utils/fakeSelectedIngridients';

const initialState = {
    ingredients: [],
    isIngredientsLoading: false,
    isIngredientsFailed: false,

    //selectedIngredients: []
    selectedIngredients: data
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
                isIngredientsFailed: true
            };
      default: {
        return state;
      }
    }
};