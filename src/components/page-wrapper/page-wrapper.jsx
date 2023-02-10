import AppHeader from '../app-header/app-header';
import LoadingIndicator from '../loading-indicator/loading-indicator';

import styles from './page-wrapper.module.css';

const PageWrapper = ({ children, activeTab, showLoadingIndicator }) => {
    return (
        <>
            { showLoadingIndicator && <LoadingIndicator/> }
            <AppHeader activeTab={ activeTab }/>
            <div className={ styles.Content }>
                { children }
            </div>
        </>
    );
};

export default PageWrapper;