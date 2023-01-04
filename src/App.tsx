import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngridients from './components/burger-ingredients/burger-ingridients';
import { data } from './utils/data';

import './App.css';


function App() {
  return (
    <div className="AppWrapper">
      <div className="App pb-10">
        <AppHeader />
        <div className="AppContentWrapper">
          <div className="AppContent">
            <BurgerIngridients ingridients={ data } />
            <BurgerConstructor ingridients={ data } />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
