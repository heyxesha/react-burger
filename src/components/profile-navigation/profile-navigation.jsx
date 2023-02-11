import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { logout } from '../../services/actions/auth';

import styles from './profile-navigation.module.css';

const ProfileNavigation = ({ activeTab }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onExitClick = () => {
        const cookies = new Cookies();
        dispatch(logout(cookies.get('refreshToken'))).then((res) => {
            if (res.success) {
                navigate('/login');
            } else {
                alert(res.error);
            }
        }).catch(error => alert(error));
    };
    
    return (
        <>
            <ul className={ `${ styles.Navigation } mt-10`}>
                <li className={ `${ styles.NavItem } ${ activeTab === 'profile' ? styles.NavItem_active : styles.NavItem_inactive } text text_type_main-medium` }>
                    <Link to="/profile">
                        Профиль
                    </Link>
                </li>
                <li className={ `${ styles.NavItem } ${ activeTab === 'orders' ? styles.NavItem_active : styles.NavItem_inactive } text text_type_main-medium` }>
                    <Link to="orders">
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
        </>
    );
};

export default ProfileNavigation;