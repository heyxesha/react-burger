import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setUnsecuredUrl } from '../../services/actions/router';

const ProtectedRouteElement = ({ element, needAuthorization }) => {
    const { isAuthorized, wasAuthorizationCheck } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    if (!wasAuthorizationCheck) {
        return null;
    }

    if (needAuthorization) {
        dispatch(setUnsecuredUrl(window.location.pathname));
        return isAuthorized ? element : <Navigate to="/login" replace />
    }

    return !isAuthorized ? element : <Navigate to="/" replace />
};

export default ProtectedRouteElement;