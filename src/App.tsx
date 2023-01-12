import { useState, useEffect } from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngridients from './components/burger-ingredients/burger-ingridients';
import getData from './utils/burger-api';
import './App.css';

const URL = 'https://norma.nomoreparties.space/api/ingredients';
const ERROR_MESSAGE = 'Произошла ошибка при получении данных :(';

function App() {
    const [state, setState] = useState({
        isLoading: false,
        ingridients: null
    });

    const getIngredients = () => {
        setState({
            ...state, 
            isLoading: true
        });
        getData('ingredients').then((response) => {
            setState({
                ...state,
                ingridients: response,
                isLoading: false
            });
        }).catch((error) => {
            setState({
                ...state,
                isLoading: false
            });
        });
    };

    useEffect(() => {
        getIngredients();
    }, []);

    return (
        <>
            <div className="App">
                <AppHeader />
                    <main className={ `App__content ${ !state.isLoading && !state.ingridients ? 'App__content_errorWrapper' : '' } pb-10` }>
                        {
                            !state.isLoading && (
                                !state.ingridients ? (
                                    <div className="Content__info text text_type_main-default">
                                        { ERROR_MESSAGE }
                                    </div>
                                ) : (
                                    <>
                                        <BurgerIngridients ingridients={ state.ingridients } />
                                        <BurgerConstructor ingridients={ state.ingridients } />
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
