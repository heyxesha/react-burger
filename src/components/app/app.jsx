
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Default } from 'react-spinners-css';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { getIngredients } from '../../services/actions/ingredients';
import CustomDragLayer  from '../custom-drag-layer/custom-drag-layer';

import styles from './app.module.css';

const ERROR_MESSAGE = 'Произошла ошибка при получении данных :(';

export const App = () => {
    const {
        ingredients,
        isIngredientsLoading
    } = useSelector(state => state.ingredients);

    const { isCreateOrderLoading } = useSelector(state => state.order);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <div className={ styles.App }>
            { isCreateOrderLoading &&
                <div className={ styles.LoadingIndicator}>
                    <Default color="#8585AD" />
                </div>
            }

            <AppHeader />
            <main className={ `${styles.Content} ${ !isIngredientsLoading && !ingredients ? styles.ErrorWrapper : '' } pb-10` }>
                {
                    !isIngredientsLoading && (
                        !ingredients ? (
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
        </div>
    );
}

export default App;
