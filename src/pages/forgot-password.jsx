import { Link } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import PageWrapper from "../components/page-wrapper/page-wrapper";
import FormPageWrapper from '../components/form-page-wrapper/form-page-wrapper';

const ForgotPassword = () => {
    return (
        <PageWrapper>
            <FormPageWrapper>
                <h2 className="text text_type_main-medium mt-6">
                    Восстановление пароля
                </h2>
                <EmailInput
                    extraClass="mt-6"
                    placeholder="Укажите e-mail" />
                <Button
                    extraClass="mt-6"
                    size="medium">
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