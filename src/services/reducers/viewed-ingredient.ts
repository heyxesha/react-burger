import {
    SET_VIEWED_INGREDIENT,
    RESET_VIEWED_INGREDIENT,

    TViewedIngredientActions
} from '../actions/viewed-ingredient';

export interface IViewedIngredientState {
    _id: string;
    image: string;
    name: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
}

const initialState: IViewedIngredientState = {
    _id: '',
    image: '',
    name: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0
};

export const viewedIngredientReducer = (state = initialState, action: TViewedIngredientActions) => {
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