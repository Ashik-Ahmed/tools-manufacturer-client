import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    useLocation,
    Navigate,
} from "react-router-dom";
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useDBUser from '../../hooks/useDBUser';
import Loading from '../Shared/Loading';

const RequireAdmin = ({ children }) => {
    let location = useLocation();
    const [user, loading] = useAuthState(auth);
    const [dbUser, dbLoading] = useDBUser(user);

    if (loading || dbLoading) {
        return <Loading />
    }
    if (dbUser.role !== 'admin') {
        toast.warn("Admin Access Required");
    }
    if (!user || dbUser.role !== 'admin') {
        signOut(auth);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAdmin;