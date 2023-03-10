import { useState, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useNavigate, useLocation } from 'react-router-dom';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import InnerIngredient from '../inner-ingredient/inner-ingredient';
import { createOrder } from '../../services/actions/order';
import { resetViewedOrder } from '../../services/actions/order';
import {
    addIngredientToConstructor,
    removeIngredientFromConstructor,
    increaceTotalSum,
    decreaseTotalSum
} from '../../services/actions/selected-ingredients';
import { increaseIngredientCounter, decreaseIngredientCounter } from '../../services/actions/ingredients';

import IState from '../../interfaces/state';
import ILocation from '../../interfaces/location';
import ISelectedIngredient from '../../interfaces/selected-ingredient';
import IActionResponseData from '../../interfaces/action-response-data';

import styles from './burger-constructor.module.css';

const MIN_ITEMS_COUNT_FOR_SCROLL = 5;
const BUN_PRICE_COEFF = 2;
const INNER_PRICE_COEFF = 1;

interface IBurgerConstructorState {
    modalVisibility: boolean,
    modalChildren: ReactNode,
    ingredientsForRender: ISelectedIngredient[]
}

const BurgerConstructor = () => {
    const [state, setState] = useState<IBurgerConstructorState>({
        modalVisibility: false,
        modalChildren: undefined,
        ingredientsForRender: []
    });

    const { bun, innerIngredients, totalSum } = useSelector((state: IState) => state.selectedIngredients);
    const { isAuthorized } = useSelector((state: IState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location: ILocation = useLocation();

    const [{ dragIngredientType, dragItemType, isHover }, dropTarget] = useDrop({
        accept: ['ingredient', 'selectedIngredient'],
        drop(item: ISelectedIngredient) {
            if (dragItemType === 'ingredient') {    
                if (item.type === 'bun') {
                    if (bun) {
                        dispatch(removeIngredientFromConstructor(bun));
                        dispatch(decreaseIngredientCounter(bun._id, BUN_PRICE_COEFF));
                        dispatch(decreaseTotalSum(bun.price * BUN_PRICE_COEFF));
                    }
                }

                if (!innerIngredients.length || item.type === 'bun') {
                    dispatch(addIngredientToConstructor(item, 0));
                    dispatch(increaseIngredientCounter(item._id, item.type === 'bun' ? BUN_PRICE_COEFF : INNER_PRICE_COEFF));
                    dispatch(increaceTotalSum(item.type === 'bun' ? item.price * BUN_PRICE_COEFF : item.price));
                }
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            dragIngredientType: monitor.getItem()?.type,
            dragItemType: monitor.getItemType()
        })
    });

    const removeItem = (item: ISelectedIngredient) => {
        dispatch(removeIngredientFromConstructor(item));
        dispatch(decreaseIngredientCounter(item._id, INNER_PRICE_COEFF));
        dispatch(decreaseTotalSum(item.price));
    };

    const orderButtonClick = () => {
        if (isAuthorized) {
            const ids = innerIngredients.map(item => item._id);
            ids.push(bun._id);
            dispatch<any>(createOrder(ids)).then((res: IActionResponseData) => {
                if (res.success) {
                    const orderDetails = ( <OrderDetails /> );
                    setState({
                        ...state,
                        modalVisibility: true,
                        modalChildren: orderDetails
                    });
                } else {
                    alert(res.error);
                }
            }).catch((error: Error) => {
                alert(error);
            });
        } else {
            const newState = {
                ...(location.state || {}),
                lastSecuredPage: location.pathname
            };
            navigate('/login', { state: newState });
        }
    };

    const close = () => {
        dispatch(resetViewedOrder());
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
                    bun ? (
                        <ConstructorElement
                            extraClass={ `${ counstructorElementWidthClass } ${ dragTargetBunClass } ml-8 mr-4 mb-4` }
                            type="top"
                            isLocked={ true }
                            text={ `${ bun.name } (????????)` }
                            price={ bun.price }
                            thumbnail={ bun.image }  />
                    ) : (
                        <div className={ `${ styles.EmptyItem } ${ counstructorElementWidthClass } ${ dragTargetBunClass } constructor-element constructor-element_pos_top mr-2 mb-4 ml-8` }>
                            ???????????????????? ??????????
                        </div>
                    )
                }
                {
                    innerIngredients.length ? (
                        <div className={ `${ innerIngredients.length > MIN_ITEMS_COUNT_FOR_SCROLL ? styles.ScrollArea : ''}` }>
                            {   
                                innerIngredients.map((item, index) => (
                                    <InnerIngredient
                                        key={ item.constructorId }
                                        item={ item }
                                        index={ index }
                                        rightMargin={ innerIngredients.length > MIN_ITEMS_COUNT_FOR_SCROLL }
                                        topMargin={ index > 0 }
                                        handleClose={ () => removeItem(item) } />
                                ))
                            }
                        </div>
                    ) : (
                        <div className={`${ styles.EmptyItem } ${ counstructorElementWidthClass } ${ dragTargetInnerClass } constructor-element mr-2 ml-8 mr-4` }>
                            ???????????????????? ??????????????
                        </div>  
                    )
                }
                {
                    bun ? (
                        <ConstructorElement
                            extraClass={ `${ counstructorElementWidthClass } ${ dragTargetBunClass } ml-8 mr-4 mt-4` }
                            type="bottom"
                            isLocked={ true }
                            text={ `${ bun.name } (??????)` }
                            price={ bun.price }
                            thumbnail={ bun.image } />
                    ) : (
                        <div className={ `${ styles.EmptyItem } ${ counstructorElementWidthClass } ${ dragTargetBunClass } constructor-element constructor-element_pos_bottom mr-2 mt-4 ml-8` }>
                            ???????????????????? ??????????
                        </div>
                    )
                }
            </div>
            <div className={ `${ styles.TotalBlock } mt-10` }>
                <div className={ `${ styles.Sum } mr-10` }>
                    <div className="text text_type_digits-medium mr-1">
                        { totalSum }
                    </div>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={ orderButtonClick }
                    disabled={ !bun }>
                    ???????????????? ??????????
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