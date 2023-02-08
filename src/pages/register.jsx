import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import PageWrapper from "../components/page-wrapper/page-wrapper";
import FormPageWrapper from '../components/form-page-wrapper/form-page-wrapper';

const RegisterPage = () => {
    return (
        <PageWrapper>
            <FormPageWrapper>
                <h2 className="text text_type_main-medium mt-6">
                    Регистрация
                </h2>
                <Input
                    extraClass="mt-6"
                    placeholder="Имя" />
                <EmailInput
                    extraClass="mt-6" />
                <PasswordInput
                    extraClass="mt-6" />
                <Button
                    extraClass="mt-6"
                    size="medium">
                    Зарегистрироваться
                </Button>
                <div className="mt-20">
                    <span className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы? 
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

export default RegisterPage;