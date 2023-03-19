import { ReactNode } from 'react';

import PageWrapper from '../page-wrapper/page-wrapper';
import ProfileNavigation from '../profile-navigation/profile-navigation';

import styles from './profile-page-wrapper.module.css';

interface IProfilePageWrapperProps {
    children?: ReactNode;
    activeTab?: string;
    showLoadingIndicator?: boolean;
}

const ProfilePageWrapper = ({
    children,
    activeTab,
    showLoadingIndicator
}: IProfilePageWrapperProps) => {
    return (
        <PageWrapper
            activeTab="profile"
            showLoadingIndicator={ showLoadingIndicator }>
            <main className={ `${ styles.ContentWrapper } pb-10`}>
                <div className={ `${ styles.Content }`}>
                    <ProfileNavigation activeTab={ activeTab } />
                    <div className={ `${ styles.Children } ml-15 mt-10` }>
                        { children }
                    </div>
                </div>
            </main>
        </PageWrapper>
    );
};

export default ProfilePageWrapper;