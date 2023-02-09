import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import PageWrapper from "../components/page-wrapper/page-wrapper";
import FormPageWrapper from '../components/form-page-wrapper/form-page-wrapper';

const LoginPage = () => {
    return (
        <PageWrapper>
            <FormPageWrapper>
                <h2 className="text text_type_main-medium mt-6">
                    Вход
                </h2>
                <EmailInput
                    extraClass="mt-6"
                    autoFocus={ true } />
                <PasswordInput
                    extraClass="mt-6" />
                <Button
                    extraClass="mt-6"
                    size="medium">
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
        </PageWrapper>
    );
};

export default LoginPage;