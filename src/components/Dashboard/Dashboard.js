import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const Dashboard = () => {

    const [authUser, loading] = useAuthState(auth);
    if (loading) {
        return <Loading />
    }


    return (
        <div class="drawer drawer-mobile h-auto bg-base-200">

            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col">
                <h2 className='text-4xl font-bold text-primary mt-6'>Dashboard</h2>

                <Outlet></Outlet>
                <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div class="drawer-side min-h-full">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4  w-56 bg-base-100 text-base-content">

                    <li><Link to='/dashboard'>My Orders</Link></li>
                    <li><Link to='add-review'>Add a review</Link></li>
                    <li><Link to='my-profile'>My Profile</Link></li>
                </ul>

            </div>
        </div >
    );
};

export default Dashboard;