import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import { AiFillHome } from 'react-icons/ai';
import { FaBlogger, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdContactPage, MdInsertComment, MdDashboardCustomize } from 'react-icons/md';

const Navbar = () => {
    const [user] = useAuthState(auth);

    // signout loggen in user
    const handleSignOut = () => {
        signOut(auth);
        localStorage.removeItem('accessToken')
    }
    return (
        <div class="navbar bg-base-100">
            <div class="navbar-start">
                <div class="dropdown">
                    <label tabindex="0" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <div>
                                <div><AiFillHome /></div>
                                <Link to='/'>Home</Link>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div><FaBlogger /></div>
                                <Link to='/blogs'>Blogs</Link>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div><ImProfile /></div>
                                <Link to='/portfolio'>Portfolio</Link>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div><MdContactPage /></div>
                                <Link to='/contact'>Contact Us</Link>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div><MdInsertComment /></div>
                                <Link to='/reviews'>Reviews</Link>
                            </div>
                        </li>

                        {
                            user ?
                                <>
                                    <li>
                                        <div>
                                            <div><MdDashboardCustomize /></div>
                                            <Link to='/dashboard'>Dashboard</Link>
                                        </div>
                                    </li>
                                    <li className='indicator'>
                                        <div>
                                            <div><FaSignOutAlt /></div>
                                            <button onClick={() => handleSignOut()}>Sign Out <span class="indicator-item indicator-center badge badge-secondary text-xs "> <small>{user.displayName}</small> </span> </button>
                                        </div>
                                    </li>
                                </>
                                :
                                <li>
                                    <div>
                                        <div><FaUserAlt /></div>
                                        <Link to='/login'>Login</Link>
                                    </div>
                                </li>
                        }

                    </ul>
                </div>
                <a href='/' class="btn btn-ghost normal-case text-xl">Tool House</a>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal p-0">
                    <li>
                        <div>
                            <div><AiFillHome /></div>
                            <Link to='/'>Home</Link>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div><FaBlogger /></div>
                            <Link to='/blogs'>Blogs</Link>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div><ImProfile /></div>
                            <Link to='/portfolio'>Portfolio</Link>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div><MdContactPage /></div>
                            <Link to='/contact'>Contact Us</Link>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div><MdInsertComment /></div>
                            <Link to='/reviews'>Reviews</Link>
                        </div>
                    </li>
                    {
                        user ?
                            <>
                                <li>
                                    <div>
                                        <div><MdDashboardCustomize /></div>
                                        <Link to='/dashboard'>Dashboard</Link>
                                    </div>
                                </li>
                                <li className='indicator'>
                                    <div>
                                        <div><FaSignOutAlt /></div>
                                        <button onClick={() => handleSignOut()}>Sign Out <span class="indicator-item indicator-center badge badge-secondary text-xs "> <small>{user.displayName}</small> </span> </button>
                                    </div>
                                </li>
                            </>
                            :
                            <li>
                                <div>
                                    <div><FaUserAlt /></div>
                                    <Link to='/login'>Login</Link>
                                </div>
                            </li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;