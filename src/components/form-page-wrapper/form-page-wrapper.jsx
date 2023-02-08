import styles from './form-page-wrapper.module.css';

const FormPageWrapper = ({ children }) => {
    return (
        <main className={ styles.Content }>
            { children }
        </main>
    );
};

export default FormPageWrapper;