import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from '../../store';
import { feedConnect, feedDisconnect } from '../../services/actions/feed';
import PageWrapper from '../../components/page-wrapper/page-wrapper';
import Feed from '../../components/feed/feed';
import OrdersList from '../../components/orders-list/orders-list';

import styles from './feed.module.css';

const MAX_ORDERS_COUNT = 20;

interface IFeedPafeState {
    doneOrders: number[];
    proccessOrders: number[];
}

const FeedPage = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState<IFeedPafeState>({
        doneOrders: [],
        proccessOrders: []
    });

    useEffect(() => {
        dispatch(feedConnect('wss://norma.nomoreparties.space/orders/all'));
        return () => {
            dispatch(feedDisconnect());
        };
    }, []);

    const { orders, total, totalToday } = useSelector(state => state.feed);

    useEffect(() => {
        const doneOrders: number[] = [];
        const proccessOrders: number[] = [];
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].status === 'done' && doneOrders.length < MAX_ORDERS_COUNT) {
                doneOrders.push(orders[i].number);
            }
            if (orders[i].status === 'pending' && proccessOrders.length < MAX_ORDERS_COUNT) {
                proccessOrders.push(orders[i].number);
            }
            if (doneOrders.length === MAX_ORDERS_COUNT && proccessOrders.length === MAX_ORDERS_COUNT) {
                break;
            }
        }
        setState({
            doneOrders,
            proccessOrders
        });
    }, [orders]);
    return (
        <PageWrapper
            activeTab="feed">
            <main className={ `${ styles.Content } pb-10` }>
                <h1 className="text text_type_main-large pt-10">Лента заказов</h1>
                <div className={ `${ styles.ContentCells } pt-10` }>
                    <div className={ styles.Feed }>
                        <Feed orders={ orders } />
                    </div>
                    <div className={ styles.OrdersTable }>
                        <div className={ styles.OrdersLists }>
                            <div className={ styles.OrdersList }>
                                <h2 className="text text_type_main-medium">
                                    Готовы:
                                </h2>
                                <div className={ `${ styles.ColumnContainer } mt-6` }>
                                    <OrdersList
                                        color="success"
                                        orders={ state.doneOrders.slice(0, 9) } />
                                    <OrdersList
                                        color="success"
                                        orders={ state.doneOrders.slice(10, 19) } />
                                </div>
                            </div>
                            <div className={ styles.OrdersList }>
                                <h2 className="text text_type_main-medium">
                                    В работе:
                                </h2>
                                <div className={ `${ styles.ColumnContainer } mt-6` }>
                                    <OrdersList
                                        color="primary"
                                        orders={ state.proccessOrders.slice(0, 9) } />
                                    <OrdersList
                                        color="primary"
                                        orders={ state.proccessOrders.slice(10, 19) } />
                                </div>
                            </div>
                        </div>
                        {
                            total !== 0 &&
                            <div className="mt-15">
                                <h2 className="text text_type_main-medium">
                                    Выполнено за все время:
                                </h2>
                                <p className={ `${ styles.Total } text text_type_digits-large` }>
                                    { total }
                                </p>
                            </div>
                        }
                        {
                            totalToday !== 0 &&
                            <div className="mt-15">
                                <h2 className="text text_type_main-medium">
                                    Выполнено за сегодня:
                                </h2>
                                <p className={ `${ styles.Total } text text_type_digits-large` }>
                                    { totalToday }
                                </p>
                            </div>
                        }
                    </div>
                </div>
            </main>
        </PageWrapper>
    );
};

export default FeedPage;