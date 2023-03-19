import { Location } from 'react-router-dom';

interface ILocationState {
    background?: ILocationState;
    lastSecuredPage?: string;
    moveFromForgotPassword?: boolean;
    pathname: string;
}

export default interface ILocation extends Location {
    state: ILocationState | null;
};