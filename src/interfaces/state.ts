import ISelectedIngredient from "./selected-ingredient";
import IIngredient from "./ingredient";

interface IAuthState {
    accessToken: string;
    refreshToken: string;
    resetTokens: boolean;
    isRegisterLoading: boolean;
    isRegisterFailed: boolean;
    isLoginLoading: boolean;
    isLoginFailed: boolean;
    isLogoutLoading: boolean;
    isLogoutFailed: boolean;
    isTokenLoading: boolean;
    isTokenFailed: boolean;
    isAuthorized: boolean;
    wasAuthorizationCheck: boolean;
}

interface ISelectedIngredients {
    totalSum: number;
    bun: ISelectedIngredient;
    innerIngredients: ISelectedIngredient[];
    prevInnerIngredients: ISelectedIngredient[];
}

interface IIngredientsState {
    ingredients: IIngredient[];
    isIngredientsLoading: boolean;
    isIngredientsFailed: boolean;
}

interface IViewedIngredientState {
    _id: string;
    image: string;
    name: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
}

interface IOrderState {
    orderId: number | undefined;
    isCreateOrderLoading: boolean;
    isCreateOrderFailed: boolean;
}

interface IResetPasswordState {
    isSendEmailLoading: boolean;
    isSendEmailFailed: boolean;
    isResetPasswordLoading: boolean;
    isResetPasswordFailed: boolean;
}

interface IUserState {
    name: string;
    email: string;
    password: string;
    isGetUserLoading: boolean;
    isGetUserFailed: boolean;
    isUpdateUserLoading: boolean;
    isUpdateUserFailed: boolean;
}

export default interface IState {
    auth: IAuthState;
    selectedIngredients: ISelectedIngredients;
    ingredients: IIngredientsState;
    viewedIngredient: IViewedIngredientState;
    order: IOrderState;
    user: IUserState;
    resetPassword: IResetPasswordState;
}