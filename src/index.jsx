import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/root';
import thunk from 'redux-thunk';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
// TODO: разобраться с composeStore
const store = createStore(rootReducer, enhancer);

root.render(
  <React.StrictMode>
    <Provider store={ store }>
        <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
