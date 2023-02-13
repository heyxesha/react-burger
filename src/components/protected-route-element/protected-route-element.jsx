import PropTypes from 'prop-types';

import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRouteElement = ({ element, needAuthorization }) => {
    const { isAuthorized, wasAuthorizationCheck } = useSelector(state => state.auth);
    const location = useLocation();

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

ProtectedRouteElement.propTypes = {
    element: PropTypes.element,
    needAuthorization: PropTypes.bool
};


export default ProtectedRouteElement;