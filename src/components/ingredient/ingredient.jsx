import { useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ACCEPT_ADD_TO_CONSTRUCTOR, CANCEL_ADD_TO_CONSTRUCTOR } from '../../services/actions/selected-ingredients';
import styles from './ingredient.module.css';

const Ingredient = ({ 
    id,
    type,
    needMargin,
    name,
    image,
    price,
    selectedCount,
    onClick
 }) => {
    const dispatch = useDispatch();
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: {
            id,
            type,
            image,
            name,
            price,
            constructorId: uuid()
        },
        end: (item, monitor) => {
            if (monitor.getDropResult()) {
                dispatch({
                    type: ACCEPT_ADD_TO_CONSTRUCTOR,
                    dragItemId: item.constructorId
                });
            } else {
                dispatch({
                    type: CANCEL_ADD_TO_CONSTRUCTOR,
                    dragItemId: item.constructorId
                });
            }
        }
    });
    return (
        <div
            className={ `${ styles.Ingredient } ${ needMargin ? 'mt-8' : '' }` }
            ref={ dragRef }
            draggable
            onClick={ onClick }>
            <img src={ image } alt={ name } />
            <div className={ `${ styles.Price } mt-1` }>
                <p className="text text_type_digits-default mr-1">
                    { price }
                </p>
                <CurrencyIcon />
            </div>
            <p className={ `${ styles.Name } text text_type_main-default mt-1` }>
                { name }
            </p>
            {
                !!selectedCount && <Counter count={ selectedCount } size="default" />
            }
        </div>
    );
};

Ingredient.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    needMargin: PropTypes.bool,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    selectedCount: PropTypes.number,
    onClick: PropTypes.func
};
  
export default Ingredient;