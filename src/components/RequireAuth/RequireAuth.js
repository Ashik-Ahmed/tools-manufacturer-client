import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    useLocation,
    Navigate,
} from "react-router-dom";
import auth from '../../firebase.init';

const RequireAuth = ({ children }) => {
    let location = useLocation();
    const [user] = useAuthState(auth);

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;