import { useState, useContext } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Events } from 'react-scroll';
import { IngredientsContext } from '../../services/app-context';
import styles from './burger-ingredients.module.css';
import IngredientsList from '../ingredients-list/ingredients-list';

const BurgerIngredients = () => {
    const { ingredients } = useContext(IngredientsContext);
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

    Events.scrollEvent.register('end', function(to, element) {
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
                                active={ activeTab === key }>
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
  
export default BurgerIngredients;