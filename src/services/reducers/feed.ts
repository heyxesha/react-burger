import {
    FEED_WS_CLOSE,
    FEED_WS_CONNECTING,
    FEED_WS_ERROR,
    FEED_WS_MESSAGE,
    FEED_WS_OPEN,

    TFeedActions
} from '../actions/feed';
import IOrder from '../../interfaces/order';

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
};

interface IFeedState {
    status: WebsocketStatus;
    connectionError: Error | null;
    orders: IOrder[];
    total: number;
    totalToday: number;
}

const initialState: IFeedState = {
    status: WebsocketStatus.OFFLINE,
    connectionError: null,
    orders: [],
    total: 0,
    totalToday: 0
};

export const feedReducer = (state: IFeedState = initialState, action: TFeedActions): IFeedState => {
    switch (action.type) {
        case FEED_WS_CONNECTING:
            return {
                ...state,
                status: WebsocketStatus.CONNECTING
            };
        case FEED_WS_ERROR:
            return {
                ...state,
                connectionError: action.error
            };
        case FEED_WS_MESSAGE:
            return {
                ...state,
                orders: action.message.orders,
                total: action.message.total,
                totalToday: action.message.totalToday
            };
        case FEED_WS_OPEN:
            return {
                ...state,
                status: WebsocketStatus.ONLINE
            };
        case FEED_WS_CLOSE:
            return initialState;
        default: {
            return state;
        }
    }
};