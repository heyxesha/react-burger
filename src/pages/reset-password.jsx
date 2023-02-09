import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { resetPassword } from '../services/actions/reset-password';
import PageWrapper from "../components/page-wrapper/page-wrapper";
import FormPageWrapper from '../components/form-page-wrapper/form-page-wrapper';
import LoadingIndicator from '../components/loading-indicator/loading-indicator';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isResetPasswordLoading } = useSelector(state => state.resetPassword);
    const [state, setState] = useState({
        password: '',
        code: '',
        saveButtonReadOnly: true
    });

    const onPasswordChange = (event) => {
        const value = event.target.value;
        if (state.password !== value) {
            setState({
                ...state,
                password: value
            });
        }
    };

    const onCodeChange = (event) => {
        const value = event.target.value;
        if (state.code !== value) {
            setState({
                ...state,
                code: value
            });
        }
    };
    
    useEffect(() => {
        const saveButtonReadOnly = state.password.length < 6 || !state.code;
        if (state.saveButtonReadOnly !== saveButtonReadOnly) {
            setState({
                ...state,
                saveButtonReadOnly
            });
        }
    }, [state.password, state.code, setState]);

    const onClick = () => {
        dispatch(resetPassword(state.password, state.code)).then((res) => {
            if (res.success) {
                navigate('/');
            } else {
                alert(res.error);
            }
        }).catch(error => alert(error));
    };

    return (
        <PageWrapper>
            { isResetPasswordLoading && <LoadingIndicator/> }
            <FormPageWrapper>
                <h2 className="text text_type_main-medium mt-6">
                    Восстановление пароля
                </h2>
                <PasswordInput
                    extraClass="mt-6"
                    placeholder="Введите новый пароль"
                    value={ state.password }
                    onChange={ onPasswordChange } />
                <Input
                    extraClass="mt-6"
                    placeholder="Введите код из письма"
                    value={ state.code }
                    onChange={ onCodeChange } />
                <Button
                    extraClass="mt-6"
                    size="medium"
                    disabled={ state.saveButtonReadOnly }
                    htmlType="submit"
                    onClick={ onClick }>
                    Сохранить
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

export default ResetPassword;