import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-item.module.css';

interface IOrderItem {
    image: string;
    count: number;
    price: number;
    name: string;
}

const OrderItem = ({
    image,
    count,
    price,
    name
}: IOrderItem) => {
    return (
        <div className={ styles.OrderItem }>
            <div className={ styles.ItemBlock }>
                <div
                    className={ styles.ImageWrapper }>
                    <img
                        className={ styles.Image }
                        width={ 112 }
                        height={ 56 }
                        src={ image }
                        alt={ image } />
                </div>
                <p className="text text_type_main-default ml-4">
                    { name }
                </p>
            </div>
            <div className={ styles.ItemBlock }>
                <p className="text text_type_digits-default mr-2">
                    { `${ count } x ${ price }` }
                </p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    );
};

export default OrderItem;