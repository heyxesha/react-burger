import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    ACCEPT_ADD_TO_CONSTRUCTOR,
    CANCEL_ADD_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
    ACCEPT_MOVING,
    CANCEL_MOVING,
    INCREASE_TOTAL_SUM,
    DECREASE_TOTAL_SUM,
    CLEAN_CONSTRUCTOR
} from '../actions/selected-ingredients';
import { selectedIngredientsReducer } from './selected-ingredients';
import { ingredient as innerIngredient } from '../../utils/fake-data';

const initialState = {
    totalSum: 0,
    bun: null,
    innerIngredients: [],
    prevInnerIngredients: []
};

const bun = {
    _id: '60666c42cc7b410027a1a9b1',
    name:' Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
};

describe('Selected ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(selectedIngredientsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle CLEAN_CONSTRUCTOR', () => {
        expect(selectedIngredientsReducer(undefined, {
            type: CLEAN_CONSTRUCTOR
        })).toEqual(initialState);
    });

    it('should handle ADD_INGREDIENT_TO_CONSTRUCTOR with bun', () => {
        expect(selectedIngredientsReducer(undefined, {
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            item: bun
        })).toEqual({
            ...initialState,
            bun
        });
    });

    it('should handle ADD_INGREDIENT_TO_CONSTRUCTOR with inner ingredient without prev inner ingredients', () => {
        expect(selectedIngredientsReducer(undefined, {
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            item: innerIngredient
        })).toEqual({
            ...initialState,
            innerIngredients: [innerIngredient],
            prevInnerIngredients: []
        });
    });

    it('should handle ADD_INGREDIENT_TO_CONSTRUCTOR with inner ingredient and prev inner ingredients', () => {
        expect(selectedIngredientsReducer({
            ...initialState,
            prevInnerIngredients: [innerIngredient]
        }, {
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            item: innerIngredient
        })).toEqual({
            ...initialState,
            innerIngredients: [innerIngredient],
            prevInnerIngredients: [innerIngredient]
        });
    });

    it('should handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR with inner ingredient', () => {
        expect(selectedIngredientsReducer({
            ...initialState,
            innerIngredients: [innerIngredient]
        }, {
            type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
            item: innerIngredient
        })).toEqual({
            ...initialState,
            innerIngredients: []
        });
    });

    it('should handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR with bun', () => {
        expect(selectedIngredientsReducer({
            ...initialState,
            bun: bun
        }, {
            type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
            item: bun
        })).toEqual({
            ...initialState,
            bun: null
        });
    });

    it('should handle MOVE_INGREDIENT_IN_CONSTRUCTOR without prev inner ingredients', () => {
        const anotherInnerIngredient = {
            ...innerIngredient,
            constructorId: '321'
        };
        expect(selectedIngredientsReducer({
            ...initialState,
            innerIngredients: [innerIngredient, anotherInnerIngredient],
            prevInnerIngredients: []
        }, {
            type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
            from: 0,
            to: 1
        })).toEqual({
            ...initialState,
            innerIngredients: [anotherInnerIngredient, innerIngredient],
            prevInnerIngredients: [innerIngredient, anotherInnerIngredient]
        });
    });

    it('should handle MOVE_INGREDIENT_IN_CONSTRUCTOR with prev inner ingredients', () => {
        const anotherInnerIngredient = {
            ...innerIngredient,
            constructorId: '321'
        };
        expect(selectedIngredientsReducer({
            ...initialState,
            innerIngredients: [innerIngredient, anotherInnerIngredient],
            prevInnerIngredients: [anotherInnerIngredient, innerIngredient]
        }, {
            type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
            from: 0,
            to: 1
        })).toEqual({
            ...initialState,
            innerIngredients: [anotherInnerIngredient, innerIngredient],
            prevInnerIngredients: [anotherInnerIngredient, innerIngredient]
        });
    });

    it('should handle ACCEPT_MOVING', () => {
        expect(selectedIngredientsReducer({
            ...initialState,
            prevInnerIngredients: [innerIngredient]
        }, {
            type: ACCEPT_MOVING,
            from: 0,
            to: 1
        })).toEqual({
            ...initialState,
            prevInnerIngredients: []
        });
    });

    it('should handle CANCEL_MOVING with prev inner ingredients', () => {
        expect(selectedIngredientsReducer({
            ...initialState,
            prevInnerIngredients: [innerIngredient]
        }, {
            type: CANCEL_MOVING
        })).toEqual({
            ...initialState,
            innerIngredients: [innerIngredient],
            prevInnerIngredients: []
        });
    });

    it('should handle CANCEL_MOVING without prev inner ingredients', () => {
        expect(selectedIngredientsReducer({
            ...initialState,
            innerIngredients: [innerIngredient]
        }, {
            type: CANCEL_MOVING
        })).toEqual({
            ...initialState,
            innerIngredients: [innerIngredient]
        });
    });

    it('should handle CANCEL_ADD_TO_CONSTRUCTOR with prev inner ingredients', () => {
        expect(selectedIngredientsReducer({
            ...initialState,
            prevInnerIngredients: [innerIngredient]
        }, {
            type: CANCEL_ADD_TO_CONSTRUCTOR
        })).toEqual({
            ...initialState,
            innerIngredients: [innerIngredient],
            prevInnerIngredients: []
        });
    });

    it('should handle CANCEL_ADD_TO_CONSTRUCTOR without prev inner ingredients', () => {
        expect(selectedIngredientsReducer({
            ...initialState,
            innerIngredients: [innerIngredient],
            prevInnerIngredients: []
        }, {
            type: CANCEL_ADD_TO_CONSTRUCTOR
        })).toEqual({
            ...initialState,
            innerIngredients: [innerIngredient]
        });
    });

    it('should handle INCREASE_TOTAL_SUM', () => {
        expect(selectedIngredientsReducer(undefined, {
            type: INCREASE_TOTAL_SUM,
            value: 1
        })).toEqual({
            ...initialState,
            totalSum: 1
        });
    });

    it('should handle DECREASE_TOTAL_SUM', () => {
        expect(selectedIngredientsReducer({
            ...initialState,
            totalSum: 1
        }, {
            type: DECREASE_TOTAL_SUM,
            value: 1
        })).toEqual({
            ...initialState,
            totalSum: 0
        });
    });

    it('should handle ACCEPT_ADD_TO_CONSTRUCTOR with dragging', () => {
        expect(selectedIngredientsReducer({
            ...initialState,
            innerIngredients: [{
                ...innerIngredient,
                isDragging: true
            }],
            prevInnerIngredients: [innerIngredient]
        }, {
            type: ACCEPT_ADD_TO_CONSTRUCTOR
        })).toEqual({
            ...initialState,
            innerIngredients: [innerIngredient],
            prevInnerIngredients: []
        });
    });

    it('should handle ACCEPT_ADD_TO_CONSTRUCTOR without dragging', () => {
        expect(selectedIngredientsReducer({
            ...initialState,
            innerIngredients: [innerIngredient],
            prevInnerIngredients: [innerIngredient]
        }, {
            type: ACCEPT_ADD_TO_CONSTRUCTOR
        })).toEqual({
            ...initialState,
            innerIngredients: [innerIngredient],
            prevInnerIngredients: []
        });
    });
});