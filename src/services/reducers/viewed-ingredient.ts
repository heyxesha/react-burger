import {
    SET_VIEWED_INGREDIENT,
    RESET_VIEWED_INGREDIENT,

    TViewedIngredientActions
} from '../actions/viewed-ingredient';

interface IViewedIngredientState {
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

export const viewedIngredientReducer = (
    state: IViewedIngredientState = initialState,
    action: TViewedIngredientActions): IViewedIngredientState  => {
    switch (action.type) {
        case SET_VIEWED_INGREDIENT:
            return {
                _id: action.data._id,
                name: action.data.name,
                calories: action.data.calories,
                proteins: action.data.proteins,
                fat: action.data.fat,
                carbohydrates: action.data.carbohydrates,
                image: action.data.image_large
            };
        case RESET_VIEWED_INGREDIENT:
            return initialState;
        default: {
            return state;
        }
    }
};