import { useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import CustomDragLayer  from '../../components/custom-drag-layer/custom-drag-layer';
import PageWrapper from '../../components/page-wrapper/page-wrapper';

import styles from './main.module.css';

const ERROR_MESSAGE = 'Произошла ошибка при получении данных :(';

const MainPage = () => {
    const { isCreateOrderLoading } = useSelector(state => state.order);
    const {
        ingredients,
        isIngredientsLoading
    } = useSelector(state => state.ingredients);

    return (
        <PageWrapper
            activeTab="constructor"
            showLoadingIndicator={ isCreateOrderLoading }>
            <main className={ `${styles.Content} ${ !isIngredientsLoading && !ingredients.length ? styles.ErrorWrapper : '' } pb-10` }>
                {
                    !isIngredientsLoading && (
                        !ingredients.length ? (
                            <div className={` ${ styles.Info } text text_type_main-default`}>
                                { ERROR_MESSAGE }
                            </div>
                        ) : (
                            <DndProvider backend={ HTML5Backend }>
                                <BurgerIngredients />
                                <BurgerConstructor />
                                <CustomDragLayer />
                            </DndProvider>
                        )
                    )
                }
            </main>
        </PageWrapper>
    );
};

export default MainPage;