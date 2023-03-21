import { useState } from 'react';
import { Link, Events } from 'react-scroll';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector } from '../../store';
import IngredientsList from '../ingredients-list/ingredients-list';

import { TIngredientsGroups } from '../../types/ingredients-groups';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    const { ingredients } = useSelector(state => state.ingredients);
    const ingredientsGroups: TIngredientsGroups = {
        bun: {
            name: 'Булки',
            ingredients: []
        },
        sauce: {
            name: 'Соусы',
            ingredients: []
        },
        main: {
            name: 'Начинки',
            ingredients: []
        }
    };
    ingredients.forEach((item) => {
        ingredientsGroups[item.type].ingredients.push(item);
    });
    
    const [activeTab, setActiveTab] = useState<string>('bun');

    Events.scrollEvent.register('end', (to) => {
        setActiveTab(to);
    });

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
                                onClick={ () => {} }>
                                { ingredientsGroups[key].name }
                            </Tab>
                        </Link>
                    ))
                }
            </div>
            <IngredientsList ingredientsGroups={ ingredientsGroups }  />
        </div>
    );
};
  
export default BurgerIngredients;