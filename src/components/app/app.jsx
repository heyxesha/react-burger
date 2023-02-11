import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

import { checkAutharization } from '../../services/actions/auth';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile/profile';
import ProfileOrdersPage from '../../pages/profile-orders';

import styles from './app.module.css';

export const App = () => {
    // TODO: красиво было бы переделать все алерты на модалки
    const { accessToken, refreshToken, resetTokens } = useSelector(state => state.auth);
    const dispatch = useDispatch();

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

    return (
        <div className={ styles.App }>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={ <MainPage /> }
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
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
