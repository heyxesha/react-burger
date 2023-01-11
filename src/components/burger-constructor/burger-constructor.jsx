import { useState } from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientsPropTypes from '../../utils/IngridientsPropTypes';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingridient-details';
import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ ingridients }) => {
    const [state, setState] = useState({
        modalVisibility: false,
        modalChildren: null,
        modalTitle: ''
    });

    // TODO: наверное, на следующих итерациях проекта сможем получать эти данные динамически.
    const bun = ingridients[0];
    const innerIngridients = [];
    let totalSum = bun.price * 2;
    /* "Вырежем" все булки, чтобы остались только все соусы и все начинки по одному разу. Пока не получаем список
        выбранных ингридиентов динамически, в качестве mock будет такое. */
    ingridients.forEach((item) => {
        if (item.type !== 'bun') {
            innerIngridients.push(item);
            totalSum += item.price;
        }
    });

    const orderButtonClick = () => {
        const orderDetails = (
            <OrderDetails orderId="034536" />
        );
        setState({
            modalTitle: '',
            modalVisibility: true,
            modalChildren: orderDetails
        });
    };

    const ingridientClick = (item) => {
        const ingridientDetails = (
            <IngredientDetails
                name={ item.name }
                image={ item.image_large }
                calories={ item.calories }
                proteins={ item.proteins }
                fat={ item.fat }
                carbohydrates={ item.carbohydrates }
            />
        );
        setState({
            modalTitle: 'Детали ингридиента',
            modalVisibility: true,
            modalChildren: ingridientDetails
        });
    };

    const close = () => {
        setState({
            modalTitle: '',
            modalVisibility: false,
            modalChildren: null
        });
    };

    return (
        <div className={ `${ styles.BurgerConstructor } pt-25 pl-4` }>
            <div onClick={() => ingridientClick(bun)}>
                <ConstructorElement
                    extraClass={ `${ styles.Bun } ml-8 mr-4 ${ innerIngridients.length ? 'mb-4' : '' }` }
                    type="top"
                    isLocked={ true }
                    text={ `${ bun.name } (верх)` }
                    price={ bun.price }
                    thumbnail={ bun.image }  />
            </div>
            <div className={ styles.ScrollArea }>
                {
                    innerIngridients.map((item, index) => (
                        <div
                            key={ item._id } className={ `${ styles.DragItem } ${ index > 0 ? 'mt-4' : '' }` }
                            onClick={ () => ingridientClick(item) }>
                            <DragIcon />
                            <ConstructorElement
                                extraClass={ `${styles.Ingridient} ml-2 mr-2` }
                                text={ item.name }
                                price={ item.price }
                                thumbnail={ item.image } />
                        </div>
                    ))
                }
            </div>
            <div onClick={() => ingridientClick(bun)}>
                <ConstructorElement
                    extraClass={ `${ styles.Bun } ml-8 mr-4 mt-4` }
                    type="bottom"
                    isLocked={ true }
                    text={ `${ bun.name } (низ)` }
                    price={ bun.price }
                    thumbnail={ bun.image } />
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
                    onClick={ orderButtonClick }>
                    Оформить заказ
                </Button>
            </div>
            { state.modalVisibility &&
                <Modal
                    title={ state.modalTitle }
                    children={ state.modalChildren }
                    onClose={ close } /> 
            }
        </div>
    );
};

BurgerConstructor.propTypes = {
    ingridients: IngridientsPropTypes
}; 
  
export default BurgerConstructor;