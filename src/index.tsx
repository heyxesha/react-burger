import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import './index.css';

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/root';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

const root = ReactDOM.createRoot(
    document.getElementById('root')!
);

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: true
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
