import { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { getEmptyImage } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { moveIngredientInConstructor, acceptMoving, cancelMoving } from '../../services/actions/selected-ingredients';
import { addIngredientToConstructor, increaceTotalSum } from '../../services/actions/selected-ingredients';
import { increaseIngredientCounter } from '../../services/actions/ingredients';
import { IngredientPropTypes } from '../../utils/types';

import styles from './inner-ingredient.module.css';

const InnerIngredient = ({
    index,
    item,
    handleClose,
    rightMargin,
    topMargin
}) => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const { innerIngredients } = useSelector(state => state.selectedIngredients);
    const [{ isDragging }, dragRef, dragPreview] = useDrag({
        type: 'selectedIngredient',
        item: {
            ...item,
            index
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
        end: (item, monitor) => {
            if (monitor.getDropResult()) {
                dispatch(acceptMoving());
            } else {
                dispatch(cancelMoving());
            }
        }
    });

    useEffect(() => {
        dragPreview(getEmptyImage())
    }, [dragPreview]);

    const [, dropRef] = useDrop({
        accept: ['ingredient', 'selectedIngredient'],
        hover(item, monitor) {
            if (item.type !== 'bun') {
                if (!ref.current) {
                    return;
                }
    
                const dragIndex = item.index;
                const hoverIndex = index;
            
                if (dragIndex === hoverIndex) {
                    return;
                }
            
                const hoverBoundingRect = ref.current?.getBoundingClientRect();
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const clientOffset = monitor.getClientOffset();
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                let hasAdded = false;
    
                if (monitor.getItemType() === 'ingredient' && item.type !== 'bun') {
                    const findIndex = innerIngredients.findIndex(itemInConstructor => itemInConstructor.constructorId === item.constructorId);
                    if (findIndex === -1) {
                        hasAdded = true;
                        dispatch(addIngredientToConstructor({
                            ...item,
                            isDragging: true
                        }, hoverIndex));
                    }
                }
            
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
            
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
    
                if (!hasAdded) {
                    dispatch(moveIngredientInConstructor(dragIndex, hoverIndex));
                }

                item.index = hoverIndex;
            }
        },
        drop: (item, monitor) => {
            if (monitor.getItemType() === 'ingredient' && item.type !== 'bun') {
                dispatch(increaseIngredientCounter(item._id, 1));
                dispatch(increaceTotalSum(item.price));
            }
            
            return { type: 'innerIngredients' };
        }
    });
    dragRef(dropRef(ref));
    return (
       <div
            ref={ ref }
            draggable
            className={ `${ styles.InnerIngredient } ${ topMargin ? 'mt-4' : '' } ${ isDragging || item.isDragging ? styles.Drag : '' }` }>
            <DragIcon />
            <ConstructorElement
                extraClass={ `ml-2 ${ rightMargin ? 'mr-2' : '' }` }
                text={ item.name }
                price={ item.price }
                thumbnail={ item.image }
                handleClose={ handleClose } />
        </div>
    );
};


InnerIngredient.propTypes = {
    item: IngredientPropTypes.isRequired,
    index: PropTypes.number.isRequired,
    handleClose: PropTypes.func.isRequired,
    rightMargin: PropTypes.bool,
    topMargin: PropTypes.bool
};

export default InnerIngredient;