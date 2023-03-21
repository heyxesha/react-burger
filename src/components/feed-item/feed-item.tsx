import { useState, useEffect } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector } from '../../store';
import { orderStatus } from '../../utils/order-status';

import styles from './feed-item.module.css';

const MAX_INGREDIENTS_COUNT = 6;

interface IFeedItemProps {
    number: number;
    name: string;
    status?: string;
    ingredientIds: string[];
    date: string;
    onClick?: () => void;
}

interface IFeedItemState {
    images: string[];
    more: number;
    price: number;
}

const FeedItem = ({
    number,
    name,
    status,
    date,
    ingredientIds,
    onClick
}: IFeedItemProps) => {
    const [state, setState] = useState<IFeedItemState>({
        images: [],
        more: 0,
        price: 0
    });
    const { ingredients } = useSelector(state => state.ingredients);
    useEffect(() => {
        const images: string[] = [];
        let more = 0;
        let price = 0;
        ingredientIds.forEach((id) => {
            const ingredient = ingredients.find(item => item._id === id);
            if (ingredient) {
                if (images.length < MAX_INGREDIENTS_COUNT) {
                    images.push(ingredient.image);
                } else {
                    more++;
                }
                price += ingredient.type === 'bun' ? ingredient.price * 2 : ingredient.price;
            }
        });
        setState({
            images,
            more,
            price
        });
    }, [ingredients, ingredientIds]);
    return (
        <div className={ `${ styles.FeedItem } p-6` } onClick={ onClick }>
            <div className={ styles.ItemRow }>
                <p className="text text_type_digits-default">
                    { `#${ number }` }
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={ new Date(date) }/>
                </p>
            </div>
            <div className={ `${ styles.ItemRow } mt-6` }>
                <p className="text text_type_main-medium">
                    { name }
                </p>
            </div>
            {
                status &&
                <p className={ `text text_type_main-default text_color_${ orderStatus[status].style } } mt-3` }>
                    { orderStatus[status].title }
                </p>
            }
            <div className={ `${ styles.ItemRow } mt-6` }>
                <div className={ `${ styles.Ingredients } ml-4` }>
                    {
                        state.images.map((image, index) => (
                            <div
                                key={ index }
                                className={ styles.ImageWrapper }
                                style={ { zIndex: MAX_INGREDIENTS_COUNT - index } }>
                                <img
                                    style={ {zIndex: MAX_INGREDIENTS_COUNT - index - 1 } }
                                    className={ `${ styles.Image } ${ index === MAX_INGREDIENTS_COUNT - 1 ? styles.LastImage : '' }` }
                                    width={ 112 }
                                    height={ 56 }
                                    src={ image }
                                    alt={ image } />
                                {
                                    (index === MAX_INGREDIENTS_COUNT - 1 && state.more !== 0) &&
                                    <p className={ `${ styles.MoreCount } text text_type_main-default` }>
                                        { `+${ state.more }` }
                                    </p>
                                }
                            </div>
                        ))
                    }
                </div>
                <div className={ `${ styles.Price } ml-6` }>
                    <p className="text text_type_digits-default mr-2">
                        { state.price }
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

export default FeedItem;