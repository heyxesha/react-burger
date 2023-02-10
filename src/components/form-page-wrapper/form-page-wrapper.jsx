import PageWrapper from '../page-wrapper/page-wrapper';

import styles from './form-page-wrapper.module.css';

const FormPageWrapper = ({ children, showLoadingIndicator }) => {
    return (
        <PageWrapper showLoadingIndicator={ showLoadingIndicator }>
            <main className={ `${ styles.Content } pb-10`}>
                { children }
            </main>
        </PageWrapper>
    );
};

export default FormPageWrapper;