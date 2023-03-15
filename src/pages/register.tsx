import { useEffect, useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from '../store';
import { register } from '../services/actions/auth';
import { isValidEmail, isValidPassword } from '../utils/validators';
import { useForm } from '../hooks/useForm';
import FormPageWrapper from '../components/form-page-wrapper/form-page-wrapper';

import IActionResponseData from '../interfaces/action-response-data';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registerButtonReadOnly, setRegisterButtonReadOnly] = useState(true);

    const { isRegisterLoading } = useSelector(state => state.auth);
    const { values, handleChange } = useForm({
        name: '',
        email: '',
        password: ''
    });

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(register(values.name, values.email, values.password)).then((res: IActionResponseData) => {
            if (res.success) {
                navigate('/');
            } else {
                alert(res.error);
            }
        }).catch((error: Error) => alert(error));
    };

    useEffect(() => {
        const newRegisterButtonReadOnly =
            !values.name
            || !isValidEmail(values.email)
            || !isValidPassword(values.password);
        if (registerButtonReadOnly !== newRegisterButtonReadOnly) {
            setRegisterButtonReadOnly(newRegisterButtonReadOnly);
        }
    }, [values.name, values.email, values.password, setRegisterButtonReadOnly]);

    return (
        <FormPageWrapper showLoadingIndicator={ isRegisterLoading } onSubmit={ onSubmit }>
            <h2 className="text text_type_main-medium mt-6">
                Регистрация
            </h2>
            <Input
                extraClass="mt-6"
                placeholder="Имя"
                name="name"
                autoFocus={ true }
                value={ values.name }
                onChange={ handleChange } />
            <EmailInput
                extraClass="mt-6"
                name="email"
                value={ values.email }
                onChange={ handleChange } />
            <PasswordInput
                extraClass="mt-6"
                name="password"
                value={ values.password }
                onChange={ handleChange } />
            <Button
                htmlType="submit"
                extraClass="mt-6"
                size="medium"
                disabled={ registerButtonReadOnly }>
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
    );
};

export default RegisterPage;