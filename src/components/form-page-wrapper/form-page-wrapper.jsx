import PageWrapper from '../page-wrapper/page-wrapper';

import styles from './form-page-wrapper.module.css';

const FormPageWrapper = ({ children, showLoadingIndicator, onSubmit }) => {
    return (
        <PageWrapper showLoadingIndicator={ showLoadingIndicator }>
            <form className={ `${ styles.Content } pb-10`}  onSubmit={ onSubmit }>
                { children }
            </form>
        </PageWrapper>
    );
};

export default FormPageWrapper;