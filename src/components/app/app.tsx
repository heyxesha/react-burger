import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { useSelector, useDispatch } from '../../store';
import { checkAutharization } from '../../services/actions/auth';
import { resetViewedIngredient } from '../../services/actions/viewed-ingredient';
import { resetViewedOrder } from '../../services/actions/order';
import { getIngredients } from '../../services/actions/ingredients';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import MainPage from '../../pages/main/main';
import FeedPage from '../../pages/feed/feed';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile/profile';
import ProfileOrdersPage from '../../pages/profile-orders';
import OrderPage from '../../pages/order/order';
import Modal from '../modal/modal';
import IngredientDetailsPage from '../../pages/ingredient-details/ingredient-details';
import NotFoundPage from '../../pages/not-found/not-found';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Order from '../order/order';
import OrderHeader from '../order-header/order-header';

import ILocation from '../../interfaces/location';

import styles from './app.module.css';

export const App = () => {
    /**
     * TODO: 
     * 1. Красиво было бы переделать все алерты на модалки
     * 2. Развесить еще в разных местах ожиданчики (?????)
     * 3. Возможно, переписать обращение к токенам
     * 4. Заменить хардкод цвета на var
     * 5. Вынести общие стили
     * 6. ХАРДКОР: переписать на createAcrtion и createReducer
     */
    
    const {
        accessToken,
        refreshToken,
        resetTokens
    } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location: ILocation = useLocation();
    const background = location.state?.background;

    useEffect(() => {
        dispatch(checkAutharization());
    }, []);

    useEffect(() => {
        if (accessToken) {
            const cookies = new Cookies();
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 20);
            cookies.set('accessToken', accessToken, { path: '/', expires });
        }
    }, [accessToken]);

    useEffect(() => {
        if (refreshToken) {
            const cookies = new Cookies();
            cookies.set('refreshToken', refreshToken, { path: '/' });
        }
    }, [refreshToken]);

    useEffect(() => {
        if (resetTokens) {
            const cookies = new Cookies();
            cookies.remove('accessToken');
            cookies.remove('refreshToken');
        }
    }, [resetTokens]);

    useEffect(() => {
        dispatch(getIngredients());
    }, []);
    
    const onModalClose = () => {
        dispatch(resetViewedIngredient());
        dispatch(resetViewedOrder());
        const to = location.state?.background?.pathname;
        navigate(to || '/', {
            replace: true,
            state: {
                ...(location.state || {}),
                background: ''
            }
        });
    };

    return (
        <div className={ styles.App }>
            <Routes location={ background || location }>
                <Route
                    path="/"
                    element={ <MainPage /> }
                />
                <Route
                    path="/feed"
                    element={ <FeedPage /> }
                />
                <Route
                    path="/feed/:id"
                    element={ <OrderPage /> }
                />
                <Route
                    path="/login"
                    element={
                        <ProtectedRouteElement
                            needAuthorization={ false }
                            element={ <LoginPage /> }
                        />
                    }
                />
                <Route
                    path="/register"
                    element={
                        <ProtectedRouteElement
                            needAuthorization={ false }
                            element={ <RegisterPage /> }
                        />
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <ProtectedRouteElement
                            needAuthorization={ false }
                            element={ <ForgotPasswordPage /> }
                        />
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <ProtectedRouteElement
                            needAuthorization={ false }
                            element={ <ResetPasswordPage /> }
                        />
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRouteElement
                            needAuthorization={ true }
                            element={ <ProfilePage /> }
                        />
                    }
                >
                </Route>
                <Route
                    path="/profile/:orders"
                    element={
                        <ProtectedRouteElement
                            needAuthorization={ true }
                            element={ <ProfileOrdersPage/> }
                        />
                    }
                />
                <Route
                    path="/profile/:orders/:id"
                    element={
                        <ProtectedRouteElement
                            needAuthorization={ true }
                            element={ <OrderPage /> }
                        />
                    }
                />
                <Route
                    path="/:ingredients/:id"
                    element={ <IngredientDetailsPage /> }
                />
                <Route
                    path="*"
                    element={ <NotFoundPage /> }
                />
            </Routes>
            {
                background &&
                <Routes>
                    <Route
                        path="/:ingredients/:id"
                        element={ 
                            <Modal
                                title="Детали ингридиента"
                                onClose={ onModalClose }>
                                    <IngredientDetails />
                            </Modal>
                        }
                    />
                    <Route
                        path="/feed/:id"
                        element={ 
                            <Modal
                                onClose={ onModalClose }
                                customHeaderContent={
                                    <OrderHeader />
                                }>
                                <Order />
                            </Modal>
                        }
                    />
                    <Route
                        path="/profile/:orders/:id"
                        element={
                            <ProtectedRouteElement
                                needAuthorization={ true }
                                element={
                                    <Modal
                                        onClose={ onModalClose }
                                        customHeaderContent={
                                            <OrderHeader />
                                        }>
                                            <Order />
                                    </Modal>
                                }
                            />
                        }
                    />
                </Routes>
            }
        </div>
    );
}

export default App;
