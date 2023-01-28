
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { getIngredients } from '../../services/actions/ingredients';

import styles from './app.module.css';

const ERROR_MESSAGE = 'Произошла ошибка при получении данных :(';

function App() {
    const {
        ingredients,
        isIngredientsLoading,
        isIngredientsFailed
    } = useSelector(state => state.ingredients);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    // TODO: хочу добавить ожиданчик и проверку не на ingredients, а на isIngredientsFailed
    return (
        <div className={ styles.App }>
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
                            </DndProvider>
                        )
                    )
                }
            </main>
        </div>
    );
}

export default App;
