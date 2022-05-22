import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import user from '../../Assets/images/user.png'

const MyProfile = () => {
    const [user] = useAuthState(auth);
    console.log(user.photoURL);
    return (
        <div>
            <h2>My Profile</h2>
            <img src={user?.photoURL || user} alt="" />
        </div>
    );
};

export default MyProfile;