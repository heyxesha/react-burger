import { TAppActions } from "../store";
import IWSMessage from './ws-message';

export default interface IWSActions {
    connect: string;
    disconnect: string;
    onConnecting: () => TAppActions;
    onConnect: () => TAppActions;
    onMessage: (message: IWSMessage) => TAppActions;
    onError: (error: Error) => TAppActions;
    onClose: () => TAppActions;
    send?: string;
}