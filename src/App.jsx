import { useState, useEffect } from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import getData from './utils/burger-api';
import { SelectedIngredientsContext, IngredientsContext } from './services/app-context.js';
import './App.css';

const ERROR_MESSAGE = 'Произошла ошибка при получении данных :(';

function App() {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setLoadingStatus] = useState(false);

    const getIngredients = () => {
        setLoadingStatus(true);
        getData('ingredients').then((response) => {
            setLoadingStatus(false);
            setIngredients(response.data);
        }).catch(() => {
            setLoadingStatus(false);
        });
    };

    useEffect(() => {
        getIngredients();
    }, []);

    return (
        <>
            <div className="App">
                <AppHeader />
                    <main className={ `App__content ${ !isLoading && !ingredients ? 'App__content_errorWrapper' : '' } pb-10` }>
                        {
                            !isLoading && (
                                !ingredients ? (
                                    <div className="Content__info text text_type_main-default">
                                        { ERROR_MESSAGE }
                                    </div>
                                ) : (
                                    <>
                                        <IngredientsContext.Provider value={ { ingredients, setIngredients } }>
                                            <BurgerIngredients />
                                        </IngredientsContext.Provider>
                                        <SelectedIngredientsContext.Provider value={ { selectedIngredients, setSelectedIngredients } }>
                                            <BurgerConstructor />
                                        </SelectedIngredientsContext.Provider>
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
