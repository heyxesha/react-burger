import { Link } from 'react-router-dom';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import Button from '../nav-button/nav-button';

import styles from './app-header.module.css';

const AppHeader = ({ activeTab }) => {
  return (
    <header className={ `${ styles.HeaderWrapper } p-4` }>
        <div className={ styles.Header }>
            <div className={ styles.LeftBlock }>
            <Link to="/">
                <Button
                    iconType="burger"
                    style={ activeTab === 'constructor' ? 'primary' : 'secondary'}
                    title="Конструктор" />
            </Link>
            <Link to="/orders-feed">
                <Button
                    iconType="list"
                    style={ activeTab === '/orders-feed' ? 'primary' : 'secondary'}
                    title="Лента заказов" />
            </Link>
            </div>
            <Link to="/" className={ styles.Logo }>
                <Logo />
            </Link>
            <Link to="/profile">
                <Button
                    iconType="person"
                    style={ activeTab === 'profile' ? 'primary' : 'secondary'}
                    title="Личный кабинет" />
            </Link>
        </div>
    </header>
  );
};

AppHeader.propTypes = {
    activeTab: PropTypes.string
};
  
export default AppHeader;