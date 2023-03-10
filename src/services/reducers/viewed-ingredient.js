import {
    SET_VIEWED_INGREDIENT,
    RESET_VIEWED_INGREDIENT
} from '../actions/viewed-ingredient';

const initialState = {
    _id: '',
    image: '',
    name: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0
};

export const viewedIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VIEWED_INGREDIENT:
            return {
                ...action.data,
                image: action.data.image_large
            };
        case RESET_VIEWED_INGREDIENT:
            return initialState;
        default: {
            return state;
        }
    }
};