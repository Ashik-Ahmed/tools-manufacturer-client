import React, { useEffect, useState } from 'react';
import loginImage from '../../Assets/images/login.jpg'
import { FaGoogle } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import { useAuthState, useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import useToken from '../../hooks/useToken';



const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [authUser, authLoading] = useAuthState(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        emailUser,
        emailLoading,
        emailError,
    ] = useSignInWithEmailAndPassword(auth);

    const [token] = useToken(emailUser || googleUser);

    // getting the redirect location from Require Auth 
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    // user sign in successful and failed notification 
    useEffect(() => {
        if (authUser) {
            toast.success("Successfully Logged in");
            navigate(from, { replace: true });
        }
        if (emailError || googleError) {
            switch (emailError?.code) {
                case "auth/user-not-found":
                    toast.warn("No account with this email")
                    break;
                case "auth/wrong-password":
                    toast.warn("Wrong Password")
                    break;
                default:
                    toast.warn("Login failed")
                    break;
            }
        }
    }, [authUser, emailError, googleError])



    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
    }

    if (emailLoading || googleLoading) {
        return <Loading></Loading>
    }

    // if (authUser) {
    //     console.log(authUser);
    //     toast.success("Successfully Logged in");
    // }


    // if (emailError || googleError) {
    //     signInError = emailError?.message || googleError?.message;
    //     toast.error(signInError);
    // }
















    /*
     
        // set user informations in state 
        const [userInfo, setUserInfo] = useState({
            email: "",
            password: "",
        });
     
        // set errors state
        const [errors, setErrors] = useState({
            email: '',
            password: '',
        })
     
        // set the email on change 
        const handleEmailChange = (e) => {
            const emailRegex = /\S+@\S+\.\S+/;
            const validEmail = emailRegex.test(e.target.value);
            if (validEmail) {
                setUserInfo({ ...userInfo, email: e.target.value });
                setErrors({ ...errors, email: "" })
            }
            else {
                setErrors({ ...errors, email: "Email not Valid" });
            }
        }
     
        // set password on change 
        const handlePasswordChange = (e) => {
            setUserInfo({ ...userInfo, password: e.target.value })
        }
     
        // sign in with email and password 
        const [signInWithEmailAndPassword, emailUser, emailLoading, emailError,] = useSignInWithEmailAndPassword(auth);
        const handleSignInWithEmailAndPassword = async e => {
            e.preventDefault();
            console.log('Sign in using Email and Pass', userInfo.email, userInfo.password);
            await signInWithEmailAndPassword(userInfo.email, userInfo.password);
     
     
            //send data to the server
            // await fetch('https://gentle-meadow-44621.herokuapp.com/login', {
            //     method: "POST",
            //     headers: {
            //         "content-type": "application/json"
            //     },
            //     body: JSON.stringify({ email: userInfo.email })
            // })
            //     .then(res => res.json())
            //     .then(data => localStorage.setItem('accessToken', data.accessToken))
            // navigate(from, { replace: true });
        }
     
     
        // user sign in successful and failed notification 
        useEffect(() => {
            if (emailUser) {
                toast.success("Successfully Logged in");
            }
            if (emailError) {
                switch (emailError?.code) {
                    case "auth/user-not-found":
                        toast.warn("No account with this email")
                        break;
                    case "auth/wrong-password":
                        toast.warn("Wrong Password")
                        break;
                    default:
                        toast.warn("Login failed")
                        break;
                }
            }
        }, [emailUser, emailError])
     
        // Sign in with google account 
        const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
        const handleSignInWithGoogle = () => {
            signInWithGoogle();
        }
     
        // sign in with facebook 
        // const [signInWithFacebook, facebookUser, facebookLoading, facebookError] = useSignInWithFacebook(auth);
        //     const handleSignInWithFacebook = () => {
        //         signInWithFacebook();
        //     }
     
        //     // sign in with Github 
        //     const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);
        //     const handleSignInWithGithub = () => {
        //         signInWithGithub();
        //     }
     
        const [resetCall, setResetCall] = useState(false);
        // Handle Password Reset 
        const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);
        const handleResetPassword = async () => {
            if (userInfo.email) {
                await sendPasswordResetEmail(userInfo.email);
                setResetCall(true);
            }
            else {
                setErrors({ ...errors, email: "Enter an email" });
            }
        }
        // handle reset password error and success toast 
        useEffect(() => {
            if (resetCall) {
                if (resetError) {
                    if (resetError.message.includes("user-not-found")) {
                        toast("No account with this email")
                    }
                    else if (resetError.message.includes("auth/invalid-email")) {
                        toast.warn("Email not valid");
                    }
                    else {
                        toast.warn("Something went wrong")
                    }
                }
                else {
                    toast.success("Password reset email sent");
                }
                setResetCall(false);
            }
        }, [resetCall, resetError])
     
        // getting the current user state 
        const [authUser, authLoading, authError] = useAuthState(auth);
     
        // getting the redirect location from Require Auth 
        const location = useLocation();
        const navigate = useNavigate();
        let from = location.state?.from?.pathname || "/";
        // navigate to required page if user exists 
        useEffect(() => {
            if (authUser) {
                navigate(from, { replace: true });
            }
            if (authError) {
                toast.warn(authError.message);
            }
        }, [authUser, authError])
     
    */
    return (
        <div class="hero  bg-base-100">
            <div class="hero-content flex-col  md:h-3/4 lg:flex-row w-3/4">
                <div class="text-center w-2/5 lg:text-left mt-4">
                    <div className='text-center'>
                        <h3 className='text-5xl font-bold text-primary'>Please Login</h3>
                    </div>
                    <img className='mt-4' src={loginImage} alt="" />
                    {/* <h1 class="text-5xl font-bold">Login now!</h1>
                    <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
                    {/* <form onSubmit={handleSignInWithEmailAndPassword}> */}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="card w-96 bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title mx-auto text-3xl font-bold text-primary border-b-4 pb-1">Login</h2>

                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        class="input input-bordered w-full max-w-xs"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: 'Email is required'
                                            },
                                            pattern: {
                                                //previous regex
                                                // ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2, 3})+$
                                                value: /\S+@\S+\.\S+/,
                                                message: 'Email not valid'
                                            }
                                        })}
                                    />
                                    <label class="label">
                                        {errors.email?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                                        {errors.email?.type === 'pattern' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}

                                    </label>
                                </div>


                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        class="input input-bordered w-full max-w-xs"
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: 'Password is required'
                                            },
                                            minLength: {
                                                //previous regex
                                                // \S+@\S+\.\S+
                                                value: 6,
                                                message: 'Minimum 6 characters required'
                                            }
                                        })}
                                    />
                                    <label class="label">
                                        {errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                                        {errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}

                                    </label>
                                    <label class="label">
                                        {/* <button class="label-text-alt link link-hover">Forgot password?</button> */}
                                        <p class="label-text-alt text-right">New here? <Link to='/signup' className='text-primary font-semibold  link link-hover'>Signup now.</Link></p>
                                    </label>
                                </div>
                                <div class="card-actions justify-end">
                                    <input type='submit' class="btn btn-primary w-full" value='Login'></input>
                                </div><div class="divider">OR</div>
                                <div class="form-control">
                                    <button onClick={handleSignInWithGoogle} class="btn btn-primary gap-3"><FaGoogle />  Sign in using Google</button>
                                </div>
                            </div>
                        </div>









                        {/* <div class="card-body">
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Email</span>
                                        </label>
                                        <input type="email" name='email' onChange={handleEmailChange} placeholder="email" class="input input-bordered" required />
                                        {
                                            errors?.email && <p className='text-red-500 text-left'>{errors.email}</p>
                                        }
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Password</span>
                                        </label>
                                        <input type="password" name='password' onChange={handlePasswordChange} placeholder="password" class="input input-bordered" required />
                                        <label class="label">
                                            <button onClick={handleResetPassword} class="label-text-alt link link-hover">Forgot password?</button>
                                            <p class="label-text-alt">New here? <Link to='/signup' className='text-primary font-semibold  link link-hover'>Signup now.</Link></p>
                                        </label>
                                    </div>
                                    <div class="form-control mt-6">
                                        <button type='submit' class="btn btn-primary">Login</button>
                                    </div>
                                    <div class="divider">OR</div>
                                    <div class="form-control">
                                        <button onClick={handleSignInWithGoogle} class="btn btn-primary gap-3"><FaGoogle />  Sign in using Google</button>
                                    </div>
                                </div> */}
                    </form>
                </div>

            </div>

        </div>
    );
};

export default Login;