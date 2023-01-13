import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-scroll';
import IngredientsPropTypes from '../../utils/IngredientsPropTypes';
import styles from './burger-ingredients.module.css';
import IngredientsList from '../ingredients-list/ingredients-list';

const BurgerIngredients = ({ ingredients }) => {
    const ingredientsGroups = {
        bun: {
            title: 'Булки',
            data: []
        },
        sauce: {
            title: 'Соусы',
            data: []
        },
        main: {
            title: 'Начинки',
            data: []
        }
    };

    ingredients.forEach((item) => {
        ingredientsGroups[item.type].data.push(item);
    });
    
    const [activeTab, setActiveTab] = useState('bun');
    const onClick = (value) => {
        setActiveTab(value);
    };

    return (
        <div className={ styles.BurgerIngredients }>
            <h1 className="text text_type_main-large mt-10">
                Соберите бургер
            </h1>
            <div className={ `${ styles.Tabs } mt-5` }>
                { 
                    Object.keys(ingredientsGroups).map((key) => (
                        <Link
                            key={ key }
                            activeClass="active"
                            to={ key }
                            spy={ true }
                            smooth={ true }
                            containerId="List"
                            onSetActive={ () => setActiveTab(key) }>
                            <Tab
                                value={ key }
                                active={ activeTab === key }
                                onClick={ onClick }>
                                { ingredientsGroups[key].title }
                            </Tab>
                        </Link>
                    ))
                }
            </div>
            <IngredientsList ingredientsGroups={ ingredientsGroups }  />
        </div>
    );
};

BurgerIngredients.propTypes = {
    ingredients: IngredientsPropTypes
}; 
  
export default BurgerIngredients;