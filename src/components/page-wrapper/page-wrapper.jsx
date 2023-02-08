import AppHeader from '../app-header/app-header';

import styles from './page-wrapper.module.css';

const Page = ({ children, pageType }) => {
    return (
        <>
            <AppHeader />
            <div className={ `${ styles.Content } ${ pageType === 'form' ? styles.FormContent : '' }`}>
                { children }
            </div>
        </>
    );
};

export default Page;