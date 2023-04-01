import image from '../../images/done.svg';

import { useSelector } from '../../store';

import styles from './order-details.module.css';

const OrderDetails = () => {
    const { orderId } = useSelector(state => state.order);
    return (
        <div className={ `${styles.OrderDetails} pb-15`}>
            <p
                data-test="orderId"
                className={ `${ styles.OrderId } text text_type_digits-large mt-4` }>
                { orderId }
            </p>
            <p className="text text_type_main-medium mt-8">
                идентификатор заказа
            </p>
            <img src={image} alt="done" className="mt-15"></img>
            <p className="text text_type_main-default mt-15">
                Ваш заказ начали готовить
            </p>
            <p className={ `${ styles.InactiveText } text text_type_main-inactive mt-2` }>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};

export default OrderDetails;