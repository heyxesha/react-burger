import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingridients.module.css';
import IngridientsList from '../ingridients-list/ingridients-list';

class BurgerIngridients extends React.Component {
    render() {
      const activeTab = 'bun';
        return (
            <div className={ styles.BurgerIngridients }>
                <h1 className="text text_type_main-large mt-10">
                    Соберите бургер
                </h1>
                <div className={ styles.Tabs + ' mt-5'}>
                    <Tab value="bun" active={ activeTab === 'bun' }>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={ activeTab === 'sauce' }>
                        Соусы
                    </Tab>
                    <Tab value="main" active={ activeTab === 'main' }>
                        Начинки
                    </Tab>
                </div>
                <IngridientsList ingridients={ this.props.ingridients } />
            </div>
        );
    }
};

BurgerIngridients.propTypes = {
    ingridients: PropTypes.arrayOf(PropTypes.object).isRequired
}; 
  
export default BurgerIngridients;