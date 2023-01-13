import { useState, useEffect } from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import getData from './utils/burger-api';
import './App.css';

const ERROR_MESSAGE = 'Произошла ошибка при получении данных :(';

function App() {
    const [state, setState] = useState({
        isLoading: false,
        ingredients: null
    });

    const getIngredients = () => {
        setState({
            ...state, 
            isLoading: true
        });
        getData('ingredients').then((response) => {
            setState({
                ...state,
                ingredients: response,
                isLoading: false
            });
        }).catch(() => {
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
                    <main className={ `App__content ${ !state.isLoading && !state.ingredients ? 'App__content_errorWrapper' : '' } pb-10` }>
                        {
                            !state.isLoading && (
                                !state.ingredients ? (
                                    <div className="Content__info text text_type_main-default">
                                        { ERROR_MESSAGE }
                                    </div>
                                ) : (
                                    <>
                                        <BurgerIngredients ingredients={ state.ingredients } />
                                        <BurgerConstructor ingredients={ state.ingredients } />
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
