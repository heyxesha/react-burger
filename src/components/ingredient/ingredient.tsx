import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { getEmptyImage } from 'react-dnd-html5-backend';
import uuid from 'react-uuid';

import { useDispatch } from '../../store';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { acceptAddToConstructor, cancelAddToConstructor } from '../../services/actions/selected-ingredients';

import IIngredient from '../../interfaces/ingredient';
import IDropResult from '../../interfaces/drop-result';
import ILocation from '../../interfaces/location';

import styles from './ingredient.module.css';

interface IIngredientProps {
    item: IIngredient;
    needMargin?: boolean;
    onClick: () => void;
}

interface IDragIngredient extends IIngredient {
    constructorId: string;
}

const Ingredient = ({
    item,
    needMargin,
    onClick
}: IIngredientProps) => {
    const dispatch = useDispatch();
    const [, dragRef, dragPreview] = useDrag({
        type: 'ingredient',
        item: {
            ...item,
            constructorId: uuid()
        },
        end: (item: IDragIngredient, monitor) => {
            if (monitor.getDropResult<IDropResult>()?.type === 'innerIngredients') {
                dispatch(acceptAddToConstructor());
            } else {
                dispatch(cancelAddToConstructor());
            }
        }
    });
    
    useEffect(() => {
        dragPreview(getEmptyImage())
    }, [dragPreview]);

    const location: ILocation = useLocation();

    return (
        <Link
            to={`ingredients/${ item._id }`}
            state={
                {
                    ...(location.state || {}),
                    background: location
                }
            }>
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
                    <CurrencyIcon type="primary" />
                </div>
                <p className={ `${ styles.Name } text text_type_main-default mt-1` }>
                    { item.name }
                </p>
                {
                    !!item.selectedCount && <Counter count={ item.selectedCount } size="default" />
                }
            </div>
        </Link>
    );
};
  
export default Ingredient;