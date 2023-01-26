import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import uuid from 'react-uuid';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { createOrder } from '../../services/actions/order';
import { RESET_VIEWED_ORDER } from '../../services/actions/order';
import { ADD_INGREDIENT_TO_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from '../../services/actions/selected-ingredients';
import { INCREASE_INGREDIENT_COUNTER, DECREASE_INGREDIENT_COUNTER } from '../../services/actions/ingredients';

import styles from './burger-constructor.module.css';

const MIN_ITEMS_COUNT_FOR_SCROLL = 5;

const BurgerConstructor = () => {
    const [state, setState] = useState({
        modalVisibility: false,
        modalChildren: null
    });

    const { bun, innerIngredients, totalSum } = useSelector(state => state.selectedIngredients);
    const dispatch = useDispatch();

    const [{ dragItemType, isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            const constructorItem = {
                ...item,
                constructorId: uuid()
            };

            if (constructorItem.type === 'bun') {
                if (bun) {
                    dispatch({
                        type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
                        item: bun
                    });
                    dispatch({
                        type: DECREASE_INGREDIENT_COUNTER,
                        id: bun.id,
                        value: 2
                    });
                }
            }
            
            dispatch({
                type: ADD_INGREDIENT_TO_CONSTRUCTOR,
                item: constructorItem
            });
            dispatch({
                type: INCREASE_INGREDIENT_COUNTER,
                id: constructorItem.id,
                value: constructorItem.type === 'bun' ? 2 : 1
            });
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            dragItemType: monitor.getItem()?.type
        })
    });

    const removeItem = (item) => {
        dispatch({
            type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
            item
        });
        dispatch({
            type: DECREASE_INGREDIENT_COUNTER,
            id: item.id,
            value: 1
        });
    };

    const orderButtonClick = () => {
        const ids = innerIngredients.map(item => item._id);
        ids.push(bun.id);
        dispatch(createOrder(ids)).then(() => {
            const orderDetails = ( <OrderDetails /> );
            setState({
                ...state,
                modalVisibility: true,
                modalChildren: orderDetails
            });
        }).catch((error) => {
            alert(`Произошла ошибка при обработке заказа: ${ error }`);
        });
    };

    const close = () => {
        dispatch({ type: RESET_VIEWED_ORDER });
        setState({
            ...state,
            modalVisibility: false,
            modalChildren: null
        });
    };

    const counstructorElementWidthClass = innerIngredients.length > MIN_ITEMS_COUNT_FOR_SCROLL ? styles.CounstructorElementWidth : styles.CounstructorElementFullWidth;
    const dragTargetBunClass = isHover && dragItemType === 'bun' ? styles.DragTarget : '';
    const dragTargetInnerClass = isHover && dragItemType !== 'bun' ? styles.DragTarget : '';
    return (
        <div className={ `${ styles.BurgerConstructor } pt-25 pl-4` }>
            <div ref={ dropTarget }>
                {
                    <>
                        {
                            bun ? (
                                <ConstructorElement
                                    extraClass={ `${ styles.Bun } ml-8 mr-4 mb-4 ${ counstructorElementWidthClass } ${ dragTargetBunClass }` }
                                    type="top"
                                    isLocked={ true }
                                    text={ `${ bun.name } (верх)` }
                                    price={ bun.price }
                                    thumbnail={ bun.image }  />
                            ) : (
                                <div className={ `${ styles.EmptyItem } ${ counstructorElementWidthClass } ${ dragTargetBunClass } constructor-element constructor-element_pos_top mr-2 mb-4 ml-8` }>
                                    Перетащите булку
                                </div>
                            )
                        }
                        {
                            innerIngredients.length ? (
                                <div className={ innerIngredients.length > MIN_ITEMS_COUNT_FOR_SCROLL ? styles.ScrollArea : '' }>
                                    {   
                                        innerIngredients.map((item, index) => (
                                            <div
                                                key={ item.constructorId }
                                                className={ `${ styles.DragItem } ${ index > 0 ? 'mt-4' : '' }` }>
                                                <DragIcon />
                                                <ConstructorElement
                                                    extraClass={ `${styles.Ingredient} ml-2 ${ innerIngredients.length > MIN_ITEMS_COUNT_FOR_SCROLL ? 'mr-2' : '' }` }
                                                    text={ item.name }
                                                    price={ item.price }
                                                    thumbnail={ item.image }
                                                    handleClose={ event => removeItem(item) } />
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className={`${ styles.EmptyItem } ${ counstructorElementWidthClass } ${ dragTargetInnerClass } constructor-element mr-2 ml-8 mr-4` }>
                                    Перетащите начинку
                                </div>  
                            )
                        }
                        {
                            bun ? (
                                <ConstructorElement
                                    extraClass={ `${ styles.Bun } ml-8 mr-4 mt-4 ${ counstructorElementWidthClass } ${ dragTargetBunClass }` }
                                    type="bottom"
                                    isLocked={ true }
                                    text={ `${ bun.name } (низ)` }
                                    price={ bun.price }
                                    thumbnail={ bun.image } />
                            ) : (
                                <div className={ `${ styles.EmptyItem } ${ counstructorElementWidthClass } ${ dragTargetBunClass } constructor-element constructor-element_pos_bottom mr-2 mt-4 ml-8` }>
                                    Перетащите булку
                                </div>
                            )
                        }
                    </>
                }
            </div>
            <div className={ `${ styles.TotalBlock } mt-10` }>
                <div className={ `${ styles.Sum } mr-10` }>
                    <div className="text text_type_digits-medium mr-1">
                        { totalSum }
                    </div>
                    <CurrencyIcon />
                </div>
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={ orderButtonClick }
                    disabled={ !bun }>
                    Оформить заказ
                </Button>
            </div>
            { state.modalVisibility &&
                <Modal
                    children={ state.modalChildren }
                    onClose={ close } /> 
            }
        </div>
    );
};
  
export default BurgerConstructor;