import { data } from '../../utils/data';
import styles from './ingridients-list.module.css';
import IngridientsGroup from '../ingridients-group/ingridients-group';
import IngridientsPropTypes from '../../utils/IngridientsPropTypes';

const IngridientsList = () => {
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
        <div className={ `${ styles.List } pt-10` }>
            <IngridientsGroup name="Булки" ingridients={ buns } />
            <IngridientsGroup name="Соусы" ingridients={ sauces } />
            <IngridientsGroup name="Начинки" ingridients={ mains } />
        </div>
    );
};

IngridientsList.propTypes = {
    ingridients: IngridientsPropTypes
};
  
export default IngridientsList;