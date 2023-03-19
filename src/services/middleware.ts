import { Middleware } from 'redux';

import { TAppActions } from '../store';
import IWSActions from '../interfaces/ws-actions';

interface IConnectAction {
    endpoint: string;
}

interface ISendAction {
    message: string | SharedArrayBuffer | ArrayBuffer | Blob | ArrayBufferView;
}

export const socketMiddleware = (WSActions: IWSActions): Middleware => {
    return (store => {
        const {
            connect,
            disconnect,
            send,
            onConnecting,
            onConnect,
            onMessage,
            onError,
            onClose
        } = WSActions;
        let socket: WebSocket | null = null;
        let isConnected = false;
        return next => (action: TAppActions) => {
            const { dispatch } = store;
            if (action.type === connect && !isConnected) {
                socket = new WebSocket((action as IConnectAction).endpoint);
                isConnected = true;
                dispatch(onConnecting());
            }
            if (action.type === disconnect && socket && isConnected) {
                isConnected = false;
                socket.close();
            }
            if (action.type === send && socket && isConnected) {
                socket.send((action as ISendAction).message);
            }
            if (socket) {
                socket.onopen = () => {
                    dispatch(onConnect());
                };
                socket.onmessage = event => {
                    const parsedData = JSON.parse(event.data);
                    dispatch(onMessage(parsedData));
                };
                socket.onerror = () => {
                    // Не нашла в ответе от сокета типы ошибок, поэтому будет общая:
                    dispatch(onError(new Error('Ошибка при работе с WebSocket')));
                };
                socket.onclose = () => {
                    dispatch(onClose());
                };
            }

            next(action);
        };
    }) as Middleware;
}; 

