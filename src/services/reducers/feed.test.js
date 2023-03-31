import { feedReducer, WebsocketStatus } from "./feed";
import {
    FEED_WS_CLOSE,
    FEED_WS_CONNECTING,
    FEED_WS_ERROR,
    FEED_WS_MESSAGE,
    FEED_WS_OPEN
} from '../actions/feed';
import { order } from "../../utils/fake-data";

const initialState = {
    status: WebsocketStatus.OFFLINE,
    connectionError: null,
    orders: [],
    total: 0,
    totalToday: 0
};

describe('Feed reducer', () => {
    it('should return the initial state', () => {
        expect(feedReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle FEED_WS_CONNECTING', () => {
        expect(feedReducer(undefined, {
            type: FEED_WS_CONNECTING
        })).toEqual({
            ...initialState,
            status: WebsocketStatus.CONNECTING
        });
    });

    it('should handle FEED_WS_ERROR', () => {
        expect(feedReducer(undefined, {
            type: FEED_WS_ERROR,
            error: 'error'
        })).toEqual({
            ...initialState,
            connectionError: 'error'
        });
    });

    it('should handle FEED_WS_MESSAGE', () => {
        expect(feedReducer(undefined, {
            type: FEED_WS_MESSAGE,
            message: {
                orders: [order],
                total: 2,
                totalToday: 1
            }
        })).toEqual({
            ...initialState,
            orders: [order],
            total: 2,
            totalToday: 1
        });
    });

    it('should handle FEED_WS_OPEN', () => {
        expect(feedReducer(undefined, {
            type: FEED_WS_OPEN
        })).toEqual({
            ...initialState,
            status: WebsocketStatus.ONLINE
        });
    });

    it('should handle FEED_WS_CLOSE', () => {
        expect(feedReducer(undefined, {
            type: FEED_WS_CLOSE
        })).toEqual(initialState);
    });
});