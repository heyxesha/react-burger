import AppHeader from '../app-header/app-header';

import styles from './page-wrapper.module.css';

const PageWrapper = ({ children, activeTab }) => {
    return (
        <>
            <AppHeader activeTab={ activeTab }/>
            <div className={ styles.Content }>
                { children }
            </div>
        </>
    );
};

export default PageWrapper;