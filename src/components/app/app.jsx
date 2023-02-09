import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile/profile';

import styles from './app.module.css';

export const App = () => {
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
