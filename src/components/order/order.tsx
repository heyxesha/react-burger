import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from '../../store';
import { setViewedOrder, getOrder } from '../../services/actions/viewed-order';
import { orderStatus } from '../../utils/order-status';
import OrderItem from '../order-item/order-item';
import ILocation from '../../interfaces/location';

import styles from './order.module.css';

interface IOrderIngredients {
    id: string;
    price: number;
    name: string;
    image: string;
    count: number;
}

interface IOrderState {
    orderIngredients: IOrderIngredients[];
    totalSum: number;
}

const Order = () => {
    const location: ILocation = useLocation();
    const dispatch = useDispatch();
    const params = useParams();
    const { order } = useSelector(state => state.viewedOrder);
    const { orders } = useSelector(state => state.feed);
    const { ingredients } = useSelector(state => state.ingredients);
    const [state, setState] = useState<IOrderState>({
        orderIngredients: [],
        totalSum: 0
    });
    useEffect(() => {
        if (!order || order.number.toString() !== params.id) {
            if (orders.length) {
                const viewedOrder = orders.find(item => item.number.toString() === params.id);
                if (viewedOrder) {
                    dispatch(setViewedOrder(viewedOrder));
                }
            }
            if (!location.state?.background && params.id) {
                dispatch(getOrder(params.id));
            }
        }
    }, [order, orders]);
    useEffect(() => {
        const orderIngredients: IOrderIngredients[] = [];
        let totalSum = 0;
        if (order && ingredients) {
            order.ingredients.forEach((id) => {
                const ingredient = ingredients.find(item => item._id === id);
                if (ingredient) {
                    const orderIngredient = orderIngredients.find(item => item.id === ingredient._id);
                    if (orderIngredient) {
                        orderIngredient.count++;
                    } else {
                        orderIngredients.push({
                            id: ingredient._id,
                            price: ingredient.price,
                            name: ingredient.name,
                            image: ingredient.image,
                            count: ingredient.type === 'bun' ? 2 : 1
                        });
                    }
                    totalSum += ingredient.type === 'bun' ? ingredient.price * 2 : ingredient.price;
                }
            });
            setState({
                orderIngredients,
                totalSum
            });
        }
    }, [order, ingredients]);
    return (
        order &&
        <div className={ styles.Order }>
            {
                !location.state?.background &&
                <h1 className={ `${ styles.Number } text text_type_digits-default` }>
                    { `#${ params.id }` }
                </h1>
            }
            <h2 className="text text_type_main-medium mt-10">
                { order.name }
            </h2>
            <p className={ `text text_type_main-default text_color_${ orderStatus[order.status].style } } mt-3` }>
                { orderStatus[order.status].title }
            </p>
            <p className="text text_type_main-medium mt-10">
                Состав:
            </p>
            <div className={ `${ styles.List } mt-6` }>
                {
                    state.orderIngredients.map((item, index) => (
                        <div
                            key={ index }
                            className={ `${ index ? 'mt-4' : '' } mr-6` }>
                            <OrderItem
                                price={ item.price }
                                count={ item.count }
                                image={ item.image }
                                name={ item.name } />
                        </div>
                    ))
                }
            </div>
            <div className={ `${ styles.LastRow } mt-10` }>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={ new Date(order.createdAt) }/>
                </p>
                <div className={ styles.TotalSum }>
                    <p className="text text_type_digits-default mr-2">
                        { state.totalSum }
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

export default Order;