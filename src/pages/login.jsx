import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { login } from '../services/actions/auth';
import { isValidEmail, isValidPassword } from '../utils/validators';
import FormPageWrapper from '../components/form-page-wrapper/form-page-wrapper';

const LoginPage = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: '',
        password: '',
        registerButtonReadOnly: true
    });

    const { isLoginLoading } = useSelector(state => state.auth);
    const { prevSecuredUrl } = useSelector(state => state.router);

    const onEmailChange = (event) => {
        const email = event.target.value;
        if (state.email !== email) {
            setState({
                ...state,
                email
            });
        }
    };

    const onPasswordChange = (event) => {
        const password = event.target.value;
        if (state.password !== password) {
            setState({
                ...state,
                password
            });
        }
    };

    const onClick = () => {
        dispatch(login(state.email, state.password)).then((res) => {
            if (res.success) {
                navigate(prevSecuredUrl ? prevSecuredUrl : '/');
            } else {
                alert(res.error);
            }
        }).catch(error => alert(error));
    };

    useEffect(() => {
        const enterButtonReadOnly = !isValidEmail(state.email) || !isValidPassword(state.password);
        if (state.enterButtonReadOnly !== enterButtonReadOnly) {
            setState({
                ...state,
                enterButtonReadOnly
            });
        }
    }, [state.email, state.password, setState]);

    return (
        <FormPageWrapper showLoadingIndicator={ isLoginLoading }>
            <h2 className="text text_type_main-medium mt-6">
                Вход
            </h2>
            <EmailInput
                extraClass="mt-6"
                errorText="Некорректный e-mail"
                autoFocus={ true }
                value={ state.email }
                onChange={ onEmailChange } />
            <PasswordInput
                extraClass="mt-6"
                value={ state.password }
                onChange={ onPasswordChange } />
            <Button
                extraClass="mt-6"
                htmlType="submit"
                size="medium"
                disabled={ state.enterButtonReadOnly }
                onClick={ onClick }>
                Войти
            </Button>
            <div className="mt-20">
                <span className="text text_type_main-default text_color_inactive">
                    Вы - новый пользователь? 
                </span>
                <Link to="/register" className="text text_type_main-default text_color_accent ml-4">
                    Зарегистрироваться
                </Link>
            </div>
            <div className="mt-4">
                <span className="text text_type_main-default text_color_inactive">
                    Забыли пароль? 
                </span>
                <Link to="/forgot-password" className="text text_type_main-default text_color_accent ml-4">
                    Восстановить пароль
                </Link>
            </div>
        </FormPageWrapper>
    );
};

export default LoginPage;