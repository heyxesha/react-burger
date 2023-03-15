import { Location } from 'react-router-dom';

interface ILocationState {
    background?: string;
    lastSecuredPage?: string;
    moveFromForgotPassword?: boolean;
};

export default interface ILocation extends Location {
    state: ILocationState | null;
};