import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { useDispatch } from '../../store';
import { logout } from '../../services/actions/auth';

import IActionResponseData from '../../interfaces/action-response-data';

import styles from './profile-navigation.module.css';

interface IProfileNavigationProps {
    activeTab?: string;
}

const ProfileNavigation = ({ activeTab }: IProfileNavigationProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onExitClick = () => {
        const cookies = new Cookies();
        dispatch(logout(cookies.get('refreshToken'))).then((res: IActionResponseData) => {
            if (res.success) {
                navigate('/login');
            } else {
                alert(res.error);
            }
        }).catch((error: Error) => alert(error));
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