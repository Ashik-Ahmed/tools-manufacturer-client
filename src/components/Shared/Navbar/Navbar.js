import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';

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
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/blogs'>Blogs</Link></li>
                        {/* <li tabindex="0">
                            <a class="justify-between">
                                Parent
                                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                            </a>
                            <ul class="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li> */}
                        {
                            user ?
                                <>
                                    <li> <Link to='/dashboard'>Dashboard</Link> </li>
                                    <li><button onClick={() => handleSignOut()}>Sign Out <div class="badge badge-primary text-xs">{user.displayName}</div></button></li>
                                </>
                                :
                                <li><Link to='/login'>Login</Link></li>
                        }

                    </ul>
                </div>
                <a class="btn btn-ghost normal-case text-xl">App Name</a>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal p-0">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/blogs'>Blogs</Link></li>
                    {/* <li tabindex="0">
                        <a>
                            Parent
                            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                        </a>
                        <ul class="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </li> */}
                    {
                        user ?
                            <>
                                <li> <Link to='/dashboard'>Dashboard</Link> </li>
                                <li className='indicator'><button onClick={() => handleSignOut()}>Sign Out <span class="indicator-item badge badge-primary text-xs "> <small>{user.displayName}</small> </span> </button></li>
                            </>
                            :
                            <li><Link to='/login'>Login</Link></li>
                    }
                </ul>
            </div>
            <div class="navbar-end">
                <a class="btn">Get started</a>
            </div>
        </div>
    );
};

export default Navbar;