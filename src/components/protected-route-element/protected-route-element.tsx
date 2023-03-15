import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from '../../store';
import ILocation from '../../interfaces/location';

interface IProtectedRouteElement {
    element: ReactElement;
    needAuthorization?: boolean;
}

const ProtectedRouteElement = ({
    element,
    needAuthorization
}: IProtectedRouteElement) => {
    const { isAuthorized, wasAuthorizationCheck } = useSelector(state => state.auth);
    const location: ILocation = useLocation();

    if (!wasAuthorizationCheck) {
        return null;
    }

    if (needAuthorization && !isAuthorized) {
        return (
            <Navigate
                to="/login"
                replace
                state={
                    {
                        ...(location || {}),
                        lastSecuredPage: location.pathname
                    }
                }
            />
        );
    }

    if (!needAuthorization && isAuthorized) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ProtectedRouteElement;