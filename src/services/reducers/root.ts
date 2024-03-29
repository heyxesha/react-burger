import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { selectedIngredientsReducer} from './selected-ingredients';
import { orderReducer } from './order';
import { viewedIngredientReducer } from './viewed-ingredient';
import { resetPasswordReducer } from './reset-password';
import { authReducer } from './auth';
import { userReducer } from './user';
import { feedReducer } from './feed';
import { viewedOrderReducer } from './viewed-order';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    selectedIngredients: selectedIngredientsReducer,
    order: orderReducer,
    viewedIngredient: viewedIngredientReducer,
    resetPassword: resetPasswordReducer,
    auth: authReducer,
    user: userReducer,
    feed: feedReducer,
    viewedOrder: viewedOrderReducer 
});