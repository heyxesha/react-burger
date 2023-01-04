import React from 'react';
import PropTypes from 'prop-types';
import { data } from '../../utils/data';
import styles from './ingridients-list.module.css';
import IngridientsGroup from '../ingridients-group/ingridients-group';

class IngridientsList extends React.Component {
    render() {
        const buns = [];
        const sauces = [];
        const mains = [];
        data.forEach((item) => {
            if (item.type === 'bun') {
                buns.push(item);
            }
            if (item.type === 'sauce') {
                sauces.push(item);
            }
            if (item.type === 'main') {
                mains.push(item);
            }
        });
        return (
            <div className={ styles.List + ' pt-10'}>
                <IngridientsGroup name="Булки" ingridients={ buns } />
                <IngridientsGroup name="Соусы" ingridients={ sauces } />
                <IngridientsGroup name="Начинки" ingridients={ mains } />
            </div>
        );
    }
};

IngridientsList.propTypes = {
    ingridients: PropTypes.arrayOf(PropTypes.object).isRequired
};
  
export default IngridientsList;