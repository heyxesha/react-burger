import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { selectedIngredientsReducer} from './selected-ingredients';
import { orderReducer } from './order';
import { viewedIngredientReducer } from './viewed-ingredient';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    selectedIngredients: selectedIngredientsReducer,
    order: orderReducer,
    viewedIngredient: viewedIngredientReducer
});