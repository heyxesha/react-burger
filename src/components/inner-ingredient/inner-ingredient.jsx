import { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { MOVE_INGREDIENT_IN_CONSTRUCTOR, ACCEPT_MOVING, CANCEL_MOVING } from '../../services/actions/selected-ingredients';
import { ADD_INGREDIENT_TO_CONSTRUCTOR, INCREASE_TOTAL_SUM } from '../../services/actions/selected-ingredients';
import { INCREASE_INGREDIENT_COUNTER } from '../../services/actions/ingredients';
import { IngredientPropTypes } from '../../utils/types';

import styles from './inner-ingredient.module.css';

const InnerIngredient = ({
    index,
    item,
    handleClose,
    rightMargin,
    topMargin
}) => {
    // TODO: было бы прикольно добавить customDragLayer (разный для левого и правого списков).
    const ref = useRef(null);
    const dispatch = useDispatch();
    const { innerIngredients } = useSelector(state => state.selectedIngredients);
    const [{ isDragging }, dragRef] = useDrag({
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
                dispatch({ type: ACCEPT_MOVING });
            } else {
                dispatch({ type: CANCEL_MOVING });
            }
        }
    });
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
                        dispatch({
                            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
                            item: {
                                ...item,
                                isDragging: true
                            },
                            to: hoverIndex
                        });
                    }
                }
            
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
            
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
    
                if (!hasAdded) {
                    dispatch({
                        type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
                        from: dragIndex,
                        to: hoverIndex
                    });
                }

                item.index = hoverIndex;
            }
        },
        drop: (item, monitor) => {
            if (monitor.getItemType() === 'ingredient' && item.type !== 'bun') {
                dispatch({
                    type: INCREASE_INGREDIENT_COUNTER,
                    id: item._id,
                    value: 1
                });
                dispatch({
                    type: INCREASE_TOTAL_SUM,
                    value: item.price
                });
            }
            return {};
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