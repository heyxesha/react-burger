import { useEffect, useState, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from '../store';
import { login } from '../services/actions/auth';
import { isValidEmail, isValidPassword } from '../utils/validators';
import { useForm } from '../hooks/useForm';
import FormPageWrapper from '../components/form-page-wrapper/form-page-wrapper';

import IActionResponseData from '../interfaces/action-response-data';
import ILocation from '../interfaces/location';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [enterButtonReadOnly, setEnterButtonReadOnly] = useState(true);

    const { isLoginLoading } = useSelector(state => state.auth);
    const { values, handleChange } = useForm({
        email: '',
        password: ''
    });

    const location: ILocation = useLocation();
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(login(values.email, values.password)).then((res: IActionResponseData) => {
            if (res.success) {
                const lastSecuredPage = location.state?.lastSecuredPage;
                navigate(lastSecuredPage ? lastSecuredPage : '/');
            } else {
                alert(res.error);
            }
        }).catch((error: Error) => alert(error));
    };

    useEffect(() => {
        const newEnterButtonReadOnly = !isValidEmail(values.email) || !isValidPassword(values.password);
        if (enterButtonReadOnly !== newEnterButtonReadOnly) {
            setEnterButtonReadOnly(newEnterButtonReadOnly);
        }
    }, [values.email, values.password, setEnterButtonReadOnly]);

    return (
        <FormPageWrapper showLoadingIndicator={ isLoginLoading } onSubmit={ onSubmit }>
            <>
                <h2 className="text text_type_main-medium mt-6">
                    Вход
                </h2>
                <EmailInput
                    extraClass="mt-6"
                    autoFocus={ true }
                    value={ values.email }
                    name="email"
                    onChange={ handleChange } />
                <PasswordInput
                    extraClass="mt-6"
                    name="password"
                    value={ values.password }
                    onChange={ handleChange } />
                <Button
                    extraClass="mt-6"
                    htmlType="submit"
                    size="medium"
                    disabled={ enterButtonReadOnly }>
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
            </>
        </FormPageWrapper>
    );
};

export default LoginPage;