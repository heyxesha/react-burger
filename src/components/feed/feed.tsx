import { Link, useLocation } from 'react-router-dom';
import FeedItem from '../feed-item/feed-item';

import ILocation from '../../interfaces/location';
import IOrder from '../../interfaces/order';

import styles from './feed.module.css';

interface IFeedProps {
    orders: IOrder[];
    showStatus?: boolean;
}

const Feed = ({
    orders,
    showStatus
}: IFeedProps) => {
    const location: ILocation = useLocation();
    return (
        <div className={ `${styles.Feed} pr-2` }>
            {
                orders && orders.map((item, index) => (
                    <div key={ index } className={ index !== 0 ? 'mt-6' : '' }>
                        <Link
                            className={ index !== 0 ? 'mt-6' : '' }
                            to={`${ item.number }`}
                            state={
                                {
                                    ...(location.state || {}),
                                    background: location
                                }
                            }>
                            <FeedItem
                                status={ showStatus ? item.status : '' }
                                number={ item.number }
                                name={ item.name }
                                ingredientIds={ item.ingredients }
                                date={ item.createdAt } />
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};

export default Feed;