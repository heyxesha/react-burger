import PageWrapper from '../../components/page-wrapper/page-wrapper';

import styles from './not-found.module.css';

const NotFoundPage = () => {
    return (
        <PageWrapper>
            <main className={ styles.Content }>
                <h1 className="text text_type_main-large">
                    404 
                </h1>
                <p className="text text_type_main-default mt-4">
                    Кажется, такой страницы не существует :(
                </p>
            </main>
        </PageWrapper>
    );
};

export default NotFoundPage;