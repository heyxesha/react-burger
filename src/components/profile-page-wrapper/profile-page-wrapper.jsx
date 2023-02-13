import PropTypes from 'prop-types';

import PageWrapper from '../../components/page-wrapper/page-wrapper';
import ProfileNavigation from '../../components/profile-navigation/profile-navigation';

import styles from './profile-page-wrapper.module.css';

const ProfilePageWrapper = ({ children, activeTab }) => {
    return (
        <PageWrapper activeTab="profile">
            <main className={ `${ styles.ContentWrapper } pb-10`}>
                <div className={ `${ styles.Content } pb-10`}>
                    <ProfileNavigation activeTab={ activeTab } />
                    <div className="ml-15 mt-10">
                        { children }
                    </div>
                </div>
            </main>
        </PageWrapper>
    );
};


ProfilePageWrapper.propTypes = {
    children: PropTypes.element,
    activeTab: PropTypes.string
};


export default ProfilePageWrapper;