import PageWrapper from '../../components/page-wrapper/page-wrapper';
import Order from '../../components/order/order';

import styles from './order.module.css';

const OrderPage = () => {
    return (
        <PageWrapper>
            <div className={ `${ styles.Content } pt-6 pb-6` }>
                <Order />
            </div>
        </PageWrapper>
    );
};

export default OrderPage;