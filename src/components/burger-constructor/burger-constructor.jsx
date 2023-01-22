import { useState, useContext, useEffect, useReducer } from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { SelectedIngredientsContext } from '../../services/app-context';
import styles from './burger-constructor.module.css';

// Временные захардкоженные выбранные элементы
import { data } from '../../utils/fakeSelectedIngridients';

const MIN_ITEMS_COUNT_FOR_SCROLL = 5;

const sumReducer = (totalSum, action) => {
    switch (action.type) {
      case 'add':
        return totalSum + action.price;
      case 'remove':
        return totalSum - action.price;
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
}

const BurgerConstructor = () => {
    const [state, setState] = useState({
        modalVisibility: false,
        modalChildren: null,
        bun: null,
        innerIngredients: []
    });

    const { selectedIngredients, setSelectedIngredients } = useContext(SelectedIngredientsContext);

    const initialTotalSum = 0;
    const [totalSum, dispatch] = useReducer(sumReducer, initialTotalSum);

    // TODO: Вот тут когда-то будет полноценный dragEnd и push компонентов по одному.
    // А пока что я просто проверяю верстку пустого представления.
    const onEmptyClick = () => {
        setSelectedIngredients(data);
    };

    useEffect(() => {
        let bun = null;
        if (selectedIngredients.length) {
            bun = selectedIngredients.find(item => item.type === 'bun');
        }
        if (bun) {
            dispatch({ type: 'add', price: bun.price * 2 });
        }
        const innerIngredients = [];
        selectedIngredients.forEach((item) => {
            if (item.type !== 'bun') {
                innerIngredients.push(item);
                dispatch({ type: 'add', price: item.price });
            }
        });
        setState({
            ...state,
            bun,
            innerIngredients
        });
    }, [selectedIngredients]);

    const orderButtonClick = () => {
        const orderDetails = (
            <OrderDetails orderId="034536" />
        );
        setState({
            modalVisibility: true,
            modalChildren: orderDetails
        });
    };

    const close = () => {
        setState({
            modalVisibility: false,
            modalChildren: null
        });
    };

    const counstructorElementWidthClass = state.innerIngredients.length > MIN_ITEMS_COUNT_FOR_SCROLL ? styles.CounstructorElementWidth : styles.CounstructorElemenFulltWidth;

    return (
        <div className={ `${ styles.BurgerConstructor } pt-25 pl-4` }>
            {
                selectedIngredients.length ? (
                    <>
                        {
                            state.bun ? (
                                <ConstructorElement
                                    extraClass={ `${ styles.Bun } ml-8 mr-4 mb-4 ${ counstructorElementWidthClass }` }
                                    type="top"
                                    isLocked={ true }
                                    text={ `${ state.bun.name } (верх)` }
                                    price={ state.bun.price }
                                    thumbnail={ state.bun.image }  />
                            ) : (
                                <div className={ `${ styles.EmptyItem } ${ counstructorElementWidthClass } constructor-element constructor-element_pos_top mr-2 mb-4 ml-8` }>
                                    Перетащите булку
                                </div>
                            )
                        }
                        {
                            state.innerIngredients.length ? (
                                <div className={ state.innerIngredients.length > MIN_ITEMS_COUNT_FOR_SCROLL ? styles.ScrollArea : '' }>
                                    {   
                                        state.innerIngredients.map((item, index) => (
                                            <div
                                                key={ index } className={ `${ styles.DragItem } ${ index > 0 ? 'mt-4' : '' }` }>
                                                <DragIcon />
                                                <ConstructorElement
                                                    extraClass={ `${styles.Ingredient} ml-2 ${ state.innerIngredients.length > MIN_ITEMS_COUNT_FOR_SCROLL ? 'mr-2' : '' }` }
                                                    text={ item.name }
                                                    price={ item.price }
                                                    thumbnail={ item.image } />
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className={ `${ styles.EmptyItem } ${ counstructorElementWidthClass } constructor-element mr-2 ml-8 mr-4` }>
                                    Перетащите начинку
                                </div>  
                            )
                        }
                         {
                            state.bun ? (
                                <ConstructorElement
                                    extraClass={ `${ styles.Bun } ml-8 mr-4 mt-4 ${ counstructorElementWidthClass }` }
                                    type="bottom"
                                    isLocked={ true }
                                    text={ `${ state.bun.name } (низ)` }
                                    price={ state.bun.price }
                                    thumbnail={ state.bun.image } />
                            ) : (
                                <div className={ `${ styles.EmptyItem } ${ counstructorElementWidthClass } constructor-element constructor-element_pos_bottom mr-2 mt-4 ml-8` }>
                                    Перетащите булку
                                </div>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div onClick={ onEmptyClick }>
                            <div className={ `${ styles.EmptyItem } ${ counstructorElementWidthClass } constructor-element constructor-element_pos_top mr-2 mb-4 ml-8` }>
                                Перетащите булку
                            </div>
                            <div className={ `${ styles.EmptyItem } ${ counstructorElementWidthClass } constructor-element mr-2 ml-2 ml-8` }>
                                Перетащите начинку
                            </div>
                            <div className={ `${ styles.EmptyItem } ${ counstructorElementWidthClass } constructor-element constructor-element_pos_bottom mr-2 mt-4 ml-8` }>
                                Перетащите булку
                            </div>
                        </div>
                    </>
                )
            }
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
                    disabled={ !state.bun }>
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