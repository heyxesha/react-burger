import { useState, useEffect } from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngridients from './components/burger-ingredients/burger-ingridients';
import './App.css';

const URL = 'https://norma.nomoreparties.space/api/ingredients';
const ERROR_MESSAGE = 'Произошла ошибка при получении данных :(';

function App() {
    const [state, setState] = useState({
        isLoading: false,
        data: null
    });

    useEffect(() => {
        const getData = async () => {
            setState({
                ...state, 
                isLoading: true
            });

            fetch(URL).then((res) => {
                res.json().then((resData) => {
                    setState({
                        isLoading: false,
                        data: resData.data
                    });
                }).catch(() => {
                    setState({
                        ...state,
                        isLoading: false
                    });
                });
            }).catch(() => {
                setState({
                    ...state,
                    isLoading: false
                });
            });
        }

        getData();
    }, []);

    return (
        <div className="App">
            <AppHeader />
                <main className={ `App__content ${ !state.isLoading && !state.data ? 'App__content_errorWrapper' : '' } pb-10` }>
                    {
                        !state.isLoading && (
                            !state.data ? (
                                <div className="Content__info text_type_main-default">
                                    { ERROR_MESSAGE }
                                </div>
                            ) : (
                                <>
                                    <BurgerIngridients ingridients={ state.data } />
                                    <BurgerConstructor ingridients={ state.data } />
                                </>
                            )
                        )
                    }
                </main>
        </div>
    );
}

export default App;
