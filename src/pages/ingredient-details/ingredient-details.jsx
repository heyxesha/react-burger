import PageWrapper from '../../components/page-wrapper/page-wrapper';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

import styles from './ingredient-details.module.css';

const IngredientDetailsPage = () => {
    return (
        <PageWrapper>
            <div className={ styles.Content }>
                <IngredientDetails />
            </div>
        </PageWrapper>
    );
};

export default IngredientDetailsPage;