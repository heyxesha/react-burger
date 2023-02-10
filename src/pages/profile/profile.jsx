import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { logout } from "../../services/actions/auth";
import PageWrapper from "../../components/page-wrapper/page-wrapper";
import LoadingIndicator from '../../components/loading-indicator/loading-indicator';

import styles from './profile.module.css';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLogoutLoading } = useSelector(state => state.auth);

    const onIconClick = () => {};

    const onExitClick = () => {
        const cookies = new Cookies();
        dispatch(logout(cookies.get('refreshToken'))).then((res) => {
            if (res.success) {
                navigate('/');
            } else {
                alert(res.error);
            }
        }).catch(error => alert(error));
    };

    return (
        <PageWrapper activeTab="profile">
            { isLogoutLoading && <LoadingIndicator/> }
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
                        <li
                            className={ `${ styles.NavItem } ${ styles.NavItem_inactive } text text_type_main-medium` }
                            onClick={ onExitClick }>
                            <button className={ styles.ExitButton }>
                                Выход
                            </button>
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
                            errorText="Пароль должен быть не короче 6 символов."
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