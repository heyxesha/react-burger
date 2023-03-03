import { ReactNode, FormEvent } from 'react';

import PageWrapper from '../page-wrapper/page-wrapper';

import styles from './form-page-wrapper.module.css';

interface IFormPageWrapperProps {
    showLoadingIndicator: boolean;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    children: ReactNode | ReactNode[];
}

const FormPageWrapper = ({
    children,
    showLoadingIndicator,
    onSubmit
}: IFormPageWrapperProps) => {
    return (
        <PageWrapper showLoadingIndicator={ showLoadingIndicator }>
            <form className={ `${ styles.Content } pb-10`}  onSubmit={ onSubmit }>
                { children }
            </form>
        </PageWrapper>
    );
};

export default FormPageWrapper;