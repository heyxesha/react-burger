import thunk, { ThunkAction } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';

//add to fix https://github.com/reduxjs/redux-thunk/issues/333
import type {} from 'redux-thunk/extend-redux';

import { TAuthActions } from './services/actions/auth';
import { TIngtedientsActions } from './services/actions/ingredients';
import { IOrderActions } from './services/actions/order';
import { TResetPasswordActions } from './services/actions/reset-password';
import { ISelectedIngredientsActions } from './services/actions/selected-ingredients';
import { TUserActions } from './services/actions/user';
import { TViewedIngredientActions } from './services/actions/viewed-ingredient';
import { TViewedOrderActions } from './services/actions/viewed-order';
import { socketMiddleware } from './services/middleware';
import { rootReducer } from './services/reducers/root';

import { TFeedActions } from './services/actions/feed';

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, socketMiddleware()],
    devTools: true
});

export type TRootState = ReturnType<typeof rootReducer>;

type TAppActions =
      TAuthActions
    | TIngtedientsActions
    | IOrderActions
    | TResetPasswordActions
    | ISelectedIngredientsActions
    | TUserActions
    | TViewedIngredientActions
    | TFeedActions
    | TViewedOrderActions;

export type TAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TRootState,
  unknown,
  TAppActions
>

type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;