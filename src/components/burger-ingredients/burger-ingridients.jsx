import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-scroll';
import IngridientsPropTypes from '../../utils/IngridientsPropTypes';
import styles from './burger-ingridients.module.css';
import IngridientsList from '../ingridients-list/ingridients-list';

const BurgerIngridients = ({ ingridients }) => {
    const ingridientsGroups = {
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

    ingridients.forEach((item) => {
        ingridientsGroups[item.type].data.push(item);
    });
    
    const [activeTab, setActiveTab] = useState('bun');
    const onClick = (value) => {
        setActiveTab(value);
    };

    return (
        <div className={ styles.BurgerIngridients }>
            <h1 className="text text_type_main-large mt-10">
                Соберите бургер
            </h1>
            <div className={ `${ styles.Tabs } mt-5` }>
                { 
                    Object.keys(ingridientsGroups).map((key) => (
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
                                { ingridientsGroups[key].title }
                            </Tab>
                        </Link>
                    ))
                }
            </div>
            <IngridientsList ingridientsGroups={ ingridientsGroups }  />
        </div>
    );
};

BurgerIngridients.propTypes = {
    ingridients: IngridientsPropTypes
}; 
  
export default BurgerIngridients;