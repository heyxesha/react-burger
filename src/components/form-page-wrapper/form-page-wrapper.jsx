import styles from './form-page-wrapper.module.css';

const FormPageWrapper = ({ children }) => {
    return (
        <main className={ `${ styles.Content } pb-10`}>
            { children }
        </main>
    );
};

export default FormPageWrapper;