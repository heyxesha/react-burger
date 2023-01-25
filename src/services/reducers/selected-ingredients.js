import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR
} from '../actions/selected-ingredients';

import { data } from '../../utils/fakeSelectedIngridients';

const initialState = {
    //selectedIngredients: []
    selectedIngredients: data
};

export const selectedIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            const indexTo = action.to;
            const item = action.item;
            return {
                ...state,
                selectedIngredients: []
            };
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
            const indexFrom = action.from;
            return {
                ...state,
                selectedIngredients: []
            };
      default: {
        return state;
      }
    }
};