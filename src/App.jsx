
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import { getIngredients } from './services/actions/ingredients';

import './App.css';

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
        <>
            <div className="App">
                <AppHeader />
                    <main className={ `App__content ${ !isIngredientsLoading && !ingredients ? 'App__content_errorWrapper' : '' } pb-10` }>
                        {
                            !isIngredientsLoading && (
                                !ingredients ? (
                                    <div className="Content__info text text_type_main-default">
                                        { ERROR_MESSAGE }
                                    </div>
                                ) : (
                                    <>
                                        <DndProvider backend={ HTML5Backend }>
                                            <BurgerIngredients />
                                            <BurgerConstructor />
                                        </DndProvider>
                                    </>
                                )
                            )
                        }
                    </main>
            </div>
            <div id="modalRoot" className="ModalWrapper"></div>
        </>
    );
}

export default App;
