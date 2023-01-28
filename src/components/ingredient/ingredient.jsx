import { useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { acceptAddToConstructor, cancelAddToConstructor } from '../../services/actions/selected-ingredients';
import { IngredientPropTypes } from "../../utils/types";

import styles from './ingredient.module.css';

const Ingredient = ({
    item,
    needMargin,
    onClick
}) => {
    const dispatch = useDispatch();
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: {
            ...item,
            constructorId: uuid()
        },
        end: (item, monitor) => {
            console.log(monitor.getDropResult()?.type);
            if (monitor.getDropResult()?.type === 'innerIngredients') {
                dispatch(acceptAddToConstructor());
            } else {
                dispatch(cancelAddToConstructor());
            }
        }
    });
    return (
        <div
            className={ `${ styles.Ingredient } ${ needMargin ? 'mt-8' : '' }` }
            ref={ dragRef }
            draggable
            onClick={ onClick }>
            <img src={ item.image } alt={ item.name } />
            <div className={ `${ styles.Price } mt-1` }>
                <p className="text text_type_digits-default mr-1">
                    { item.price }
                </p>
                <CurrencyIcon />
            </div>
            <p className={ `${ styles.Name } text text_type_main-default mt-1` }>
                { item.name }
            </p>
            {
                !!item.selectedCount && <Counter count={ item.selectedCount } size="default" />
            }
        </div>
    );
};

Ingredient.propTypes = {
    item: IngredientPropTypes.isRequired,
    needMargin: PropTypes.bool,
    onClick: PropTypes.func
};
  
export default Ingredient;