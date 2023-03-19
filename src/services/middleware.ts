import { Middleware } from 'redux';
import { 
    FEED_CONNECT,
    FEED_DISCONNECT,

    feedWSConnecting,
    feedWSOpen,
    feedWSMessage,
    feedWSClose,
    feedWSError,

    TFeedActions
} from './actions/feed';

export const socketMiddleware = (): Middleware => {
    return (store => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        return next => (action: TFeedActions) => {
            const { dispatch } = store;
            if (action.type === FEED_CONNECT && !isConnected) {
                socket = new WebSocket(action.endpoint);
                isConnected = true;
                dispatch(feedWSConnecting());
            }
            if (action.type === FEED_DISCONNECT && isConnected) {
                isConnected = false;
                socket?.close();
            }
            if (socket) {
                socket.onopen = () => {
                    dispatch(feedWSOpen());
                };
                socket.onmessage = event => {
                    const parsedData = JSON.parse(event.data);
                    dispatch(feedWSMessage(parsedData));
                };
                socket.onerror = () => {
                    // Не нашла в ответе от сокета типы ошибок, поэтому будет общая:
                    dispatch(feedWSError(new Error('Ошибка при работе с WebSocket')));
                };
                socket.onclose = () => {
                    dispatch(feedWSClose());
                };
            }

            next(action);
        };
    }) as Middleware;
}; 

