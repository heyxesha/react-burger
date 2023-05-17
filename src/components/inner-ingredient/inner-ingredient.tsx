import { useRef, useEffect, RefObject } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from '../../store';
import { moveIngredientInConstructor, acceptMoving, cancelMoving } from '../../services/actions/selected-ingredients';
import { addIngredientToConstructor, increaceTotalSum } from '../../services/actions/selected-ingredients';
import { increaseIngredientCounter } from '../../services/actions/ingredients';

import ISelectedIngredient from '../../interfaces/selected-ingredient';
import IDropResult from '../../interfaces/drop-result';

import styles from './inner-ingredient.module.css';

interface IInnerIngredientProps {
    index: number;
    item: ISelectedIngredient;
    handleClose: () => void|undefined;
    rightMargin?: boolean;
    topMargin?: boolean;
}

const InnerIngredient = ({
    index,
    item,
    handleClose,
    rightMargin,
    topMargin
}: IInnerIngredientProps) => {
    const ref: RefObject<HTMLDivElement> = useRef(null);
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
        end: (item: ISelectedIngredient, monitor) => {
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
        hover(item: ISelectedIngredient, monitor) {
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
                const clientOffsetY = clientOffset?.y || 0;
                const hoverClientY = clientOffsetY - hoverBoundingRect.top;
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
            
            const dropResult: IDropResult = { type: 'innerIngredients' }
            return dropResult;
        }
    });
    dragRef(dropRef(ref));
    return (
       <div
            data-test="inner-ingredient"
            ref={ ref }
            draggable
            className={ `${ styles.InnerIngredient } ${ topMargin ? 'mt-4' : '' } ${ isDragging || item.isDragging ? styles.Drag : '' }` }>
            <DragIcon type="primary" />
            <ConstructorElement
                extraClass={ `ml-2 ${ rightMargin ? 'mr-2' : '' }` }
                text={ item.name }
                price={ item.price }
                thumbnail={ item.image }
                handleClose={ handleClose } />
        </div>
    );
};

export default InnerIngredient;