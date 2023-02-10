import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { register } from '../services/actions/auth';
import { isValidEmail, isValidPassword } from '../utils/validators';
import PageWrapper from "../components/page-wrapper/page-wrapper";
import FormPageWrapper from '../components/form-page-wrapper/form-page-wrapper';
import LoadingIndicator from '../components/loading-indicator/loading-indicator';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        registerButtonReadOnly: true
    });

    const { isRegisterLoading } = useSelector(state => state.auth);

    const onNameChange = (event) => {
        const name = event.target.value;
        if (state.name !== name) {
            setState({
                ...state,
                name
            });
        }
    };

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
        dispatch(register(state.name, state.email, state.password)).then((res) => {
            if (res.success) {
                navigate('/');
            } else {
                alert(res.error);
            }
        }).catch(error => alert(error));
    };

    useEffect(() => {
        const registerButtonReadOnly =
            !state.name
            || !isValidEmail(state.email)
            || !isValidPassword(state.password);
        if (state.registerButtonReadOnly !== registerButtonReadOnly) {
            setState({
                ...state,
                registerButtonReadOnly
            });
        }
    }, [state.name, state.email, state.password, setState]);

    return (
        <PageWrapper>
            { isRegisterLoading && <LoadingIndicator/> }
            <FormPageWrapper>
                <h2 className="text text_type_main-medium mt-6">
                    Регистрация
                </h2>
                <Input
                    extraClass="mt-6"
                    placeholder="Имя"
                    autoFocus={ true }
                    value={ state.name }
                    onChange={ onNameChange } />
                <EmailInput
                    extraClass="mt-6"
                    value={ state.email }
                    onChange={ onEmailChange }
                    errorText="Пожалуйста, введите корректный e-mail." />
                <PasswordInput
                    extraClass="mt-6"
                    value={ state.password }
                    errorText="Пароль должен быть не короче 6 символов."
                    onChange={ onPasswordChange } />
                <Button
                    htmlType="submit"
                    extraClass="mt-6"
                    size="medium"
                    disabled={ state.registerButtonReadOnly }
                    onClick={ onClick }>
                    Зарегистрироваться
                </Button>
                <div className="mt-20">
                    <span className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы? 
                    </span>
                    <Link to="/login" className="text text_type_main-default text_color_accent ml-4">
                        Войти
                    </Link>
                </div>
                </FormPageWrapper>
        </PageWrapper>
    );
};

export default RegisterPage;