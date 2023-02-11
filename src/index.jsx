import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import './index.css';

import { compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/root';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: composeEnhancers
});

root.render(
    <React.StrictMode>
        <Provider store={ store }>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
