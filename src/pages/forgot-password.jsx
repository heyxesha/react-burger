import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { sendEmail } from '../services/actions/reset-password';
import { isValidEmail } from '../utils/is-valid-email';
import PageWrapper from "../components/page-wrapper/page-wrapper";
import FormPageWrapper from '../components/form-page-wrapper/form-page-wrapper';
import LoadingIndicator from '../components/loading-indicator/loading-indicator';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSendEmailLoading } = useSelector(state => state.resetPassword);
    const [state, setState] = useState({
        value: '',
        resetButtonReadOnly: true
    });

    const onValueChanged = (event) => {
        const value = event.target.value;
        if (state.value !== value) {
            setState({
                resetButtonReadOnly: !isValidEmail(value),
                value
            });
        }
    };

    const onClick = () => {
        dispatch(sendEmail(state.value)).then(() => {
            navigate('/reset-password');
        }).catch(error => alert(`Произошла ошибка при отправке e-mail: ${ error }`));
    };

    return (
        <PageWrapper>
            { isSendEmailLoading && <LoadingIndicator/> }
            <FormPageWrapper>
                <h2 className="text text_type_main-medium mt-6">
                    Восстановление пароля
                </h2>
                <EmailInput
                    extraClass="mt-6"
                    placeholder="Укажите e-mail"
                    value={ state.value }
                    onChange={ onValueChanged } />
                <Button
                    extraClass="mt-6"
                    size="medium"
                    disabled={ state.resetButtonReadOnly }
                    htmlType="submit"
                    onClick={ onClick }>
                    Восстановить
                </Button>
                <div className="mt-20">
                    <span className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль?
                    </span>
                    <span className="text text_type_main-default text_color_accent ml-4">
                        <Link to="/login">
                            Войти
                        </Link>
                    </span>
                </div>
            </FormPageWrapper>
        </PageWrapper>
    );
};

export default ForgotPassword;