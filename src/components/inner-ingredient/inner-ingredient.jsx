import { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { MOVE_INGREDIENT_IN_CONSTRUCTOR, ACCEPT_MOVING, CANCEL_MOVING } from '../../services/actions/selected-ingredients'

import styles from './inner-ingredient.module.css';

const InnerIngredient = ({
    id,
    index,
    name,
    price,
    image,
    handleClose,
    rightMargin,
    topMargin
}) => {
    /* TODO: было бы прикольно добавить:
       1. customDragLayer (разный для левого и правого списков)
       2. Перенос из левого списка в правый с учетом позиции (наверное, придется на моменте ховера добавлять ингредиент
          с позицией to, и чтобы отрендерился прозрачный ConstructorElement, а потом воспользоваться механизмом подтверждения/отмены
          перемещения. */
    const ref = useRef(null);
    const dispatch = useDispatch();
    const [{ isDragging }, dragRef] = useDrag({
        type: 'selectedIngredient',
        item: {
            id,
            index,
            image,
            name,
            price
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
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
        accept: 'selectedIngredient',
        hover(item, monitor) {
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
        
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
        
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch({
                type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
                from: dragIndex,
                to: hoverIndex
            });
        
            item.index = hoverIndex;
        },
        drop: () => {
            return {};
        }
    });
    dragRef(dropRef(ref));
    return (
       <div
            ref={ ref }
            draggable
            className={ `${ styles.InnerIngredient } ${ topMargin ? 'mt-4' : '' } ${ isDragging ? styles.Drag : '' }` }>
            <DragIcon />
            <ConstructorElement
                extraClass={ `ml-2 ${ rightMargin ? 'mr-2' : '' }` }
                text={ name }
                price={ price }
                thumbnail={ image }
                handleClose={ handleClose } />
        </div>
    );
};

export default InnerIngredient;