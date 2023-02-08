import { Link } from 'react-router-dom';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import PageWrapper from "../components/page-wrapper/page-wrapper";
import FormPageWrapper from '../components/form-page-wrapper/form-page-wrapper';

const ResetPassword = () => {
    return (
        <PageWrapper>
            <FormPageWrapper>
                <h2 className="text text_type_main-medium mt-6">
                    Восстановление пароля
                </h2>
                <PasswordInput
                    extraClass="mt-6"
                    placeholder="Введите новый пароль" />
                <Input
                    extraClass="mt-6"
                    placeholder="Введите код из письма" />
                <Button
                    extraClass="mt-6"
                    size="medium">
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