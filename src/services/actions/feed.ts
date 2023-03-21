import IWSMessage from '../../interfaces/ws-message';

interface IFeedConnectAction {
    readonly type: typeof FEED_CONNECT;
    readonly endpoint: string;
}

interface IFeedDisconnectAction {
    readonly type: typeof FEED_DISCONNECT;
}

interface IFeedWSConnectingtAction {
    readonly type: typeof FEED_WS_CONNECTING;
}

interface IFeedWSOpenAction {
    readonly type: typeof FEED_WS_OPEN;
}

interface IFeedWSCloseAction {
    readonly type: typeof FEED_WS_CLOSE;
}

interface IFeedWSMessageAction {
    readonly type: typeof FEED_WS_MESSAGE;
    readonly message: IWSMessage;
}

interface IFeedWSErrorAction {
    readonly type: typeof FEED_WS_ERROR;
    readonly error: Error;
}

export type TFeedActions = 
      IFeedConnectAction
    | IFeedDisconnectAction 
    | IFeedWSConnectingtAction
    | IFeedWSOpenAction
    | IFeedWSCloseAction
    | IFeedWSMessageAction
    | IFeedWSErrorAction;

export const FEED_CONNECT: 'FEED_CONNECT' = 'FEED_CONNECT';
export const FEED_DISCONNECT: 'FEED_DISCONNECT' = 'FEED_DISCONNECT';
export const FEED_WS_CONNECTING: 'FEED_WS_CONNECTING' = 'FEED_WS_CONNECTING';
export const FEED_WS_OPEN: 'FEED_WS_OPEN' = 'FEED_WS_OPEN';
export const FEED_WS_CLOSE: 'FEED_WS_CLOSE' = 'FEED_WS_CLOSE';
export const FEED_WS_MESSAGE: 'FEED_WS_MESSAGE' = 'FEED_WS_MESSAGE';
export const FEED_WS_ERROR: 'FEED_WS_ERROR' = 'FEED_WS_ERROR';

export function feedConnect(endpoint: string): IFeedConnectAction {
    return {
        type: FEED_CONNECT,
        endpoint
    };
}

export function feedDisconnect(): IFeedDisconnectAction {
    return { type: FEED_DISCONNECT };
}

export function feedWSConnecting(): IFeedWSConnectingtAction {
    return { type: FEED_WS_CONNECTING };
}

export function feedWSOpen(): IFeedWSOpenAction {
    return { type: FEED_WS_OPEN };
}

export function feedWSClose(): IFeedWSCloseAction {
    return { type: FEED_WS_CLOSE };
}

export function feedWSMessage(message: IWSMessage): IFeedWSMessageAction {
    return {
        type: FEED_WS_MESSAGE,
        message
    };
}

export function feedWSError(error: Error): IFeedWSErrorAction {
    return {
        type: FEED_WS_ERROR,
        error
    };
}