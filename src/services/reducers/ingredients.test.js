import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    INCREASE_INGREDIENT_COUNTER,
    DECREASE_INGREDIENT_COUNTER,
    RESET_SELECTED_INGREDIENTS
} from '../actions/ingredients';
import { ingredientsReducer } from './ingredients';
import { ingredient } from '../../utils/fake-data';

const initialState = {
    ingredients: [],
    isIngredientsLoading: false,
    isIngredientsFailed: false
};

describe('Ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(ingredientsReducer(undefined, {
            type: GET_INGREDIENTS_REQUEST
        })).toEqual({
            ...initialState,
            isIngredientsLoading: true,
            isIngredientsFailed: false
        });
    });

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(ingredientsReducer(undefined, {
            type: GET_INGREDIENTS_SUCCESS,
            items: [ingredient]
        })).toEqual({
            ...initialState,
            isIngredientsLoading: false,
            isIngredientsFailed: false,
            ingredients: [ingredient]
        });
    });

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(ingredientsReducer(undefined, {
            type: GET_INGREDIENTS_FAILED,
            items: [ingredient]
        })).toEqual({
            ...initialState,
            isIngredientsLoading: false,
            isIngredientsFailed: true
        });
    });

    it('should handle INCREASE_INGREDIENT_COUNTER with selected count', () => {
        expect(ingredientsReducer({
            ...initialState,
            ingredients: [{
                ...ingredient,
                selectedCount: 1
            }]
        }, {
            type: INCREASE_INGREDIENT_COUNTER,
            id: '60666c42cc7b410027a1a9b7',
            value: 1
        })).toEqual({
            ...initialState,
            ingredients: [{
                ...ingredient,
                selectedCount: 2
            }]
        });
    });

    it('should handle INCREASE_INGREDIENT_COUNTER without selected count', () => {
        expect(ingredientsReducer({
            ...initialState,
            ingredients: [{
                ...ingredient
            }]
        }, {
            type: INCREASE_INGREDIENT_COUNTER,
            id: '60666c42cc7b410027a1a9b7',
            value: 1
        })).toEqual({
            ...initialState,
            ingredients: [{
                ...ingredient,
                selectedCount: 1
            }]
        });
    });

    it('should handle DECREASE_INGREDIENT_COUNTER with selected count', () => {
        expect(ingredientsReducer({
            ...initialState,
            ingredients: [{
                ...ingredient,
                selectedCount: 1
            }]
        }, {
            type: DECREASE_INGREDIENT_COUNTER,
            id: '60666c42cc7b410027a1a9b7',
            value: 1
        })).toEqual({
            ...initialState,
            ingredients: [{
                ...ingredient,
                selectedCount: 0
            }]
        });
    });

    it('should handle DECREASE_INGREDIENT_COUNTER without selected count', () => {
        expect(ingredientsReducer({
            ...initialState,
            ingredients: [{
                ...ingredient
            }]
        }, {
            type: DECREASE_INGREDIENT_COUNTER,
            id: '60666c42cc7b410027a1a9b7',
            value: 1
        })).toEqual({
            ...initialState,
            ingredients: [{
                ...ingredient,
                selectedCount: -1
            }]
        });
    });

    it('should handle RESET_SELECTED_INGREDIENTS', () => {
        expect(ingredientsReducer({
            ...initialState,
            ingredients: [{
                ...ingredient,
                selectedCount: 1
            }]
        }, {
            type: RESET_SELECTED_INGREDIENTS
        })).toEqual({
            ...initialState,
            ingredients: [{
                ...ingredient,
                selectedCount: 0
            }]
        });
    });
});