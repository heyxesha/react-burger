import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientsPropTypes from '../../utils/IngridientsPropTypes';
import styles from './burger-ingridients.module.css';
import IngridientsList from '../ingridients-list/ingridients-list';

const BurgerIngridients = (props) => {
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
            <IngridientsList ingridients={ props.ingridients } />
        </div>
    );
};

BurgerIngridients.propTypes = {
    ingridients: IngridientsPropTypes
}; 
  
export default BurgerIngridients;