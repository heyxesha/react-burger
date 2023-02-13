import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { resetPassword } from '../services/actions/reset-password';
import { isValidPassword } from '../utils/validators';
import { useForm } from '../hooks/useForm';
import FormPageWrapper from '../components/form-page-wrapper/form-page-wrapper';

const ResetPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isResetPasswordLoading } = useSelector(state => state.resetPassword);
    const [state, setState] = useState({
        saveButtonReadOnly: true,
        moveFromForgotPassword: location.state?.moveFromForgotPassword
    });

    const { values, handleChange } = useForm({
        password: '',
        code: ''
    });

    useEffect(() => {
        const saveButtonReadOnly = !isValidPassword(values.password) || !values.code;
        if (state.saveButtonReadOnly !== saveButtonReadOnly) {
            setState({
                ...state,
                saveButtonReadOnly
            });
        }
    }, [values.password, values.code, setState]);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(resetPassword(values.password, values.code)).then((res) => {
            if (res.success) {
                navigate('/');
            } else {
                alert(res.error);
            }
        }).catch(error => alert(error));
    };

    
    useEffect(() => {
        const newState = {
            ...(location.state || {}),
            moveFromForgotPassword: false
        };
        navigate(".", {
            replace: true,
            state: newState
        });
    }, []);

    if (!state.moveFromForgotPassword) {
        return <Navigate to="/" replace />
    }

    return (
        <FormPageWrapper showLoadingIndicator={ isResetPasswordLoading } onSubmit={ onSubmit }>
            <>
                <h2 className="text text_type_main-medium mt-6">
                    Восстановление пароля
                </h2>
                <PasswordInput
                    extraClass="mt-6"
                    placeholder="Введите новый пароль"
                    errorText="Пароль должен быть не короче 6 символов."
                    name="password"
                    value={ values.password }
                    onChange={ handleChange }
                    autoFocus={ true } />
                <Input
                    extraClass="mt-6"
                    placeholder="Введите код из письма"
                    name="code"
                    value={ values.code }
                    onChange={ handleChange } />
                <Button
                    extraClass="mt-6"
                    size="medium"
                    disabled={ state.saveButtonReadOnly }
                    htmlType="submit">
                    Сохранить
                </Button>
                <div className="mt-20">
                    <span className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль?
                    </span>
                    <Link to="/login" className="text text_type_main-default text_color_accent ml-4">
                        Войти
                    </Link>
                </div>
            </>
        </FormPageWrapper>
    );
};

export default ResetPasswordPage;