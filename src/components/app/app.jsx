import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';

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
                        element={ <ForgotPassword /> }
                    />
                    <Route
                        path="/reset-password"
                        element={ <ResetPassword /> }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
