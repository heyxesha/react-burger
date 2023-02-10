import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile/profile';

import styles from './app.module.css';

const ACCESS_TOKEN_LIFE_TIME = 20 * 60 * 1000;

export const App = () => {
    // TODO: красиво было бы переделать все алерты на модалки
    const { accessToken, refreshToken, resetTokens } = useSelector(state => state.auth);
    useEffect(() => {
        if (accessToken) {
            const expires = new Date() + ACCESS_TOKEN_LIFE_TIME;
            const cookies = new Cookies();
            cookies.set('accessToken', accessToken, { path: '/' }, expires);
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
            console.log(cookies.get('refreshToken'));
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
                        element={ <LoginPage /> }/>
                    <Route
                        path="/register"
                        element={ <RegisterPage /> }
                    />
                    <Route
                        path="/forgot-password"
                        element={ <ForgotPasswordPage /> }
                    />
                    <Route
                        path="/reset-password"
                        element={ <ResetPasswordPage /> }
                    />
                    <Route
                        path="/profile"
                        element={ <ProfilePage /> }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
