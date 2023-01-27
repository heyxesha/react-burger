import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import uuid from 'react-uuid';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import InnerIngredient from '../inner-ingredient/inner-ingredient';
import { createOrder } from '../../services/actions/order';
import { RESET_VIEWED_ORDER } from '../../services/actions/order';
import { ADD_INGREDIENT_TO_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from '../../services/actions/selected-ingredients';
import { INCREASE_INGREDIENT_COUNTER, DECREASE_INGREDIENT_COUNTER } from '../../services/actions/ingredients';

import styles from './burger-constructor.module.css';

const MIN_ITEMS_COUNT_FOR_SCROLL = 5;
const BUN_PRICE_COEFF = 2;
const INNER_PRICE_COEFF = 1;


const BurgerConstructor = () => {
    const [state, setState] = useState({
        modalVisibility: false,
        modalChildren: null,
        ingredientsForRender: []
    });

    const { bun, innerIngredients, totalSum } = useSelector(state => state.selectedIngredients);
    const dispatch = useDispatch();

    const [{ dragIngredientType, dragItemType, isHover }, dropTarget] = useDrop({
        accept: ['ingredient', 'selectedIngredient'],
        drop(item) {
            if (dragItemType === 'ingredient') {
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
                            value: BUN_PRICE_COEFF
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
                    value: constructorItem.type === 'bun' ? BUN_PRICE_COEFF : INNER_PRICE_COEFF
                });
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            dragIngredientType: monitor.getItem()?.type,
            dragItemType: monitor.getItemType()
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
            value: INNER_PRICE_COEFF
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
    const dragTargetBunClass = isHover && dragIngredientType === 'bun' ? styles.DragTarget : '';
    const dragTargetInnerClass = isHover && dragIngredientType !== 'bun' ? styles.DragTarget : '';
    return (
        <div className={ `${ styles.BurgerConstructor } pt-25 pl-4` }>
            <div ref={ dropTarget }>
                {
                    <>
                        {
                            bun ? (
                                <ConstructorElement
                                    extraClass={ `${ counstructorElementWidthClass } ${ dragTargetBunClass } ml-8 mr-4 mb-4` }
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
                                <div className={ `${ innerIngredients.length > MIN_ITEMS_COUNT_FOR_SCROLL ? styles.ScrollArea : ''} ${ dragTargetInnerClass } ${ styles.DragTargetBorder }` }>
                                    {   
                                        innerIngredients.map((item, index) => (
                                            <InnerIngredient
                                                key={ item.constructorId }
                                                name={ item.name }
                                                price={ item.price }
                                                image={ item.image }
                                                index={ index }
                                                rightMargin={ innerIngredients.length > MIN_ITEMS_COUNT_FOR_SCROLL }
                                                topMargin={ index > 0 }
                                                handleClose={ event => removeItem(item) } />
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
                                    extraClass={ `${ counstructorElementWidthClass } ${ dragTargetBunClass } ml-8 mr-4 mt-4` }
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