import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { sendEmail } from '../services/actions/reset-password';
import { isValidEmail } from '../utils/validators';
import { useForm } from '../hooks/useForm';
import FormPageWrapper from '../components/form-page-wrapper/form-page-wrapper';

const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isSendEmailLoading } = useSelector(state => state.resetPassword);
    const [resetButtonReadOnly, setResetButtonReadOnly] = useState(true);

    const { values, handleChange } = useForm({ email: '' });

    useEffect(() => {
        const newResetButtonReadOnly = !isValidEmail(values.email)
        if (resetButtonReadOnly !== newResetButtonReadOnly) {
            setResetButtonReadOnly(newResetButtonReadOnly);
        }
    }, [values.email, setResetButtonReadOnly]);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(sendEmail(values.email)).then(() => {
            const newState = {
                ...(location.state || {}),
                moveFromForgotPassword: true
            };
            navigate('/reset-password', { state: newState });
        }).catch(error => alert(`Произошла ошибка при отправке e-mail: ${ error }`));
    };

    return (
        <FormPageWrapper showLoadingIndicator={ isSendEmailLoading } onSubmit={ onSubmit }>
            <h2 className="text text_type_main-medium mt-6">
                Восстановление пароля
            </h2>
            <EmailInput
                extraClass="mt-6"
                placeholder="Укажите e-mail"
                errorText="Пожалуйста, введите корректный e-mail."
                name="email"
                value={ values.email }
                onChange={ handleChange }
                autoFocus={ true } />
            <Button
                extraClass="mt-6"
                size="medium"
                disabled={ resetButtonReadOnly }
                htmlType="submit">
                Восстановить
            </Button>
            <div className="mt-20">
                <span className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?
                </span>
                <Link to="/login" className="text text_type_main-default text_color_accent ml-4">
                    Войти
                </Link>
            </div>
        </FormPageWrapper>
    );
};

export default ForgotPasswordPage;