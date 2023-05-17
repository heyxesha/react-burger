import { viewedIngredientReducer } from "./viewed-ingredient";
import { SET_VIEWED_INGREDIENT, RESET_VIEWED_INGREDIENT } from "../actions/viewed-ingredient";

const initialState = {
    _id: '',
    image: '',
    name: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0
};

describe('Viewed ingredient reducer', () => {
    it('should return the initial state', () => {
        expect(viewedIngredientReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle SET_VIEWED_INGREDIENT', () => {
        expect(viewedIngredientReducer(undefined, {
            type: SET_VIEWED_INGREDIENT,
            data: {
                _id : '60666c42cc7b410027a1a9b1',
                name: 'Краторная булка N-200i',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image_large: 'https://code.s3.yandex.net/react/code/bun-02.png'
            }
        })).toEqual({
            _id : '60666c42cc7b410027a1a9b1',
            name: 'Краторная булка N-200i',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png'
        });
    });

    it('should handle RESET_VIEWED_INGREDIENT', () => {
        expect(viewedIngredientReducer(undefined, {
            type: RESET_VIEWED_INGREDIENT
        })).toEqual(initialState);
    });
});