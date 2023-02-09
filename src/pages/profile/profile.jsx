import { Link } from "react-router-dom";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import PageWrapper from "../../components/page-wrapper/page-wrapper";

import styles from './profile.module.css'

const ProfilePage = () => {
    const onIconClick = () => {};
    return (
        <PageWrapper activeTab="profile">
            <main className={ `${ styles.ContentWrapper } pb-10`}>
                <div className={ `${ styles.Content } pb-10`}>
                    <ul className={ `${ styles.Navigation } mt-10`}>
                        <li className={ `${ styles.NavItem } ${ styles.NavItem_active } text text_type_main-medium` }>
                            <Link to="/">
                                Профиль
                            </Link>
                        </li>
                        <li className={ `${ styles.NavItem } ${ styles.NavItem_inactive } text text_type_main-medium` }>
                            <Link to="/">
                                История заказов
                            </Link>
                        </li>
                        <li className={ `${ styles.NavItem } ${ styles.NavItem_inactive } text text_type_main-medium` }>
                            <Link to="/">
                                Выход
                            </Link>
                        </li>
                        <span className={ `${ styles.Text } text text_type_main-default text_color_inactive mt-20` }>
                            В этом разделе вы можете изменить свои персональные данные
                        </span>
                    </ul>
                    <div className={ `${ styles.Inputs } ml-15 mt-10` }>
                        <Input
                            placeholder="Имя"
                            value="Марк"
                            icon="EditIcon"
                            disabled
                            onIconClick={ onIconClick } />
                        <Input
                            extraClass="mt-6"
                            placeholder="Логин"
                            value="ololo"
                            icon="EditIcon"
                            disabled
                            onIconClick={ onIconClick } />
                        <PasswordInput
                            extraClass="mt-6"
                            placeholder="Пароль"
                            value="ololo"
                            icon="EditIcon"
                            disabled
                            onIconClick={ onIconClick } />
                    </div>
                </div>
            </main>
        </PageWrapper>
    );
};

export default ProfilePage;