import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useDBUser from '../../hooks/useDBUser';
import Loading from '../Shared/Loading';
import { FaUser, FaUsersCog, FaOpencart } from 'react-icons/fa';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { MdRateReview, MdOutlinePlaylistAdd, MdOutlineManageSearch } from 'react-icons/md';

const Dashboard = () => {

    const [authUser, loading] = useAuthState(auth);
    const [dbUser] = useDBUser(authUser);
    if (loading || !dbUser) {
        return <Loading />
    }



    return (
        <div class="drawer drawer-mobile h-auto bg-base-200">

            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col">

                <Outlet></Outlet>
                <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div class="drawer-side min-h-full">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4  w-64 bg-base-100 text-base-content">

                    <li>
                        <div>
                            <div className='text-black'><FaUser /></div>
                            <Link to='/dashboard'>My Profile</Link>
                        </div>
                    </li>
                    {dbUser.role !== 'admin' &&
                        <div>
                            <li>
                                <div>
                                    <div><RiShoppingCart2Fill /></div>
                                    <Link to='my-orders'>My Orders</Link>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div><MdRateReview /></div>
                                    <Link to='add-review'>Add a review</Link>
                                </div>
                            </li>
                        </div>
                    }
                    {dbUser.role === 'admin' &&
                        <div>
                            <li>
                                <div>
                                    <div className='text-xl'><FaUsersCog /></div>
                                    <Link to='manage-users'>Manage Users</Link>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div className='text-xl'><MdOutlinePlaylistAdd /></div>
                                    <Link to='add-product'>Add a Product</Link>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div className='text-xl'><MdOutlineManageSearch /></div>
                                    <Link to='manage-products'>Manage All Products</Link>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div className='text-xl'><FaOpencart /></div>
                                    <Link to='manage-orders'>Manage All Orders</Link>
                                </div>
                            </li>
                        </div>
                    }
                </ul>

            </div>
        </div >
    );
};

export default Dashboard;