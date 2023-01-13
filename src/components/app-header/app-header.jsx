import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Button from '../nav-button/nav-button';
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={ `${ styles.HeaderWrapper } p-4` }>
        <div className={ styles.Header }>
          <div className={ styles.LeftBlock }>
              <Button iconType="burger" style="primary" title="Конструктор" />
              <Button iconType="list" style="secondary" title="Лента заказов" />
          </div>
          <a href="" className={ styles.Logo }>
              <Logo />
          </a>
          <Button iconType="person" style="secondary" title="Личный кабинет" />
        </div>
        
    </header>
  );
};
  
export default AppHeader;