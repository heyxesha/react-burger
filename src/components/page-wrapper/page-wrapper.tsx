import { ReactNode } from 'react';

import AppHeader from '../app-header/app-header';
import LoadingIndicator from '../loading-indicator/loading-indicator';

import styles from './page-wrapper.module.css';

interface IPageWrapperProps {
    activeTab?: string;
    showLoadingIndicator?: boolean;
    children?: ReactNode;
}

const PageWrapper = ({
    children,
    activeTab,
    showLoadingIndicator
}: IPageWrapperProps) => {
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