import PropTypes from 'prop-types';

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

FormPageWrapper.propTypes = {
    children: PropTypes.element ||  PropTypes.array(PropTypes.element),
    showLoadingIndicator: PropTypes.bool,
    onSubmit: PropTypes.func
};

export default FormPageWrapper;