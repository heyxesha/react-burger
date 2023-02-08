import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Default } from 'react-spinners-css';

import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';

import styles from './app.module.css';

export const App = () => {
    const { isCreateOrderLoading } = useSelector(state => state.order);

    return (
        <div className={ styles.App }>
            { isCreateOrderLoading &&
                <div className={ styles.LoadingIndicator}>
                    <Default color="#8585AD" />
                </div>
            }

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <MainPage />
                    }/>
                    <Route path="/login" element={
                        <LoginPage />
                    }/>
                    <Route path="/register" element={
                        <RegisterPage />
                    }/>
                    <Route path="/forgot-password" element={
                        <ForgotPassword />
                    }/>
                    <Route path="/reset-password" element={
                        <ResetPassword />
                    }/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
