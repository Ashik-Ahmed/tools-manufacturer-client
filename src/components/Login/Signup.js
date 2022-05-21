import React, { useEffect } from 'react';
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import signup from '../../Assets/images/signup.jpg'
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const Signup = () => {

    const { register, resetField, formState: { errors, isDirty, isValid }, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    // handle successful and failed registration notification and redirect
    useEffect(() => {
        if (user) {
            toast.success("Account created successfully");
            navigate(from, { replace: true });
        }
        if (error) {
            switch (error?.code) {
                case "auth/email-already-in-use":
                    toast.warn("Email already exist")
                    break;
                case "auth/invalid-email":
                    toast.warn("Invalid Email")
                    break;
                default:
                    toast.error("Something goes wrong")
                    break;
            }
        }
    }, [user, error])

    let passMatcher;
    const onSubmit = async (data) => {
        console.log(data);
        if (data.password === data.confirmPassword) {
            await createUserWithEmailAndPassword(data.email, data.password);
            await updateProfile({ displayName: data.name });
            resetField("name");
            resetField("email");
            resetField("password");
            resetField("confirmPassword");
        }
        else {
            alert("Password did't matched");
        }
    }




    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div class="hero bg-base-100">
            <div class="hero-content flex-col  md:h-3/4 lg:flex-row-reverse w-3/4">
                <div class="text-center w-2/5 lg:text-left">
                    <div className='text-center'>
                        <h3 className='text-5xl font-bold text-primary'>Join Us</h3>
                        <p className='text-2xl font-semibold text-secondary'>It's Free</p>
                    </div>
                    <img src={signup} alt="" />
                    {/* <h1 class="text-5xl font-bold">Login now!</h1>
                <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body gap-y-0">
                                <h2 class="card-title mx-auto text-3xl font-bold text-primary border-b-4 pb-1">Sign Up</h2>

                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        class="input input-bordered w-full max-w-xs"
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: 'Name is required'
                                            }
                                        })}
                                    />
                                    <label class="label">
                                        {errors.name?.type === 'required' && <span class="label-text-alt text-red-500">{errors.name.message}</span>}

                                    </label>
                                </div>

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
                                </div>


                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text">Confirm Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        class="input input-bordered w-full max-w-xs"
                                        {...register("confirmPassword", {
                                            required: {
                                                value: true,
                                                message: 'Confirm Password is required'
                                            },
                                            minLength: {
                                                //previous regex
                                                // \S+@\S+\.\S+
                                                value: 6,
                                                message: 'Minimum 6 characters required'
                                            },
                                        })}
                                    />
                                    <label class="label">
                                        {errors.confirmPassword?.type === 'required' && <span class="label-text-alt text-red-500">{errors.confirmPassword.message}</span>}
                                        {errors.confirmPassword?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.confirmPassword.message}</span>}
                                        {passMatcher && <span class="label-text-alt text-red-500">{passMatcher}</span>}

                                    </label>
                                    <label class="label">
                                        <p class="label-text-alt text-left">Already registered? <Link to='/login' className='text-primary font-semibold link link-hover'>Login now.</Link></p>
                                    </label>
                                </div>

                                <div class="card-actions justify-end">
                                    <input type='submit' class="btn btn-primary w-full" value='Sign Up'></input>
                                </div>
                            </div>
                        </div>
                    </form>




















                    {/* <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="card-body">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name='name'
                                    placeholder="Name"
                                    class="input input-bordered"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Name is required'
                                        }
                                    })}
                                />
                                <label class="label">
                                    {errors.name?.type === 'required' && <span class="label-text-alt text-red-500">{errors.name.message}</span>}

                                </label>
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="email"
                                    class="input input-bordered"
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
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    placeholder="password"
                                    class="input input-bordered"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password is required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Minimum 6 characters required'
                                        }
                                    })}
                                />
                                {errors.password?.type === 'required' && <span class="label-text-alt text-red-500 text-left">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500 text-left">{errors.password.message}</span>}

                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    name='confirm-password'
                                    placeholder="Confirm password"
                                    class="input input-bordered"
                                    {...register("confirmPassword", {
                                        required: {
                                            value: true,
                                            message: 'Password is required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Minimum 6 characters required'
                                        }
                                    })}
                                />
                                {errors.confirmPassword?.type === 'required' && <span class="label-text-alt text-red-500 text-left">{errors.confirmPassword.message}</span>}
                                {errors.confirmPassword?.type === 'minLength' && <span class="label-text-alt text-red-500 text-left">{errors.confirmPassword.message}</span>}
                                {/* {errors.confirmPassword?.type === 'validate' && <span class="label-text-alt text-red-500 text-left">{errors.confirmPassword.message}</span>} 

                </div>
                <div class="form-control mt-6">
                    <input type='submit' class="btn btn-primary" value='Sign up'></input>
                </div>
            </div>
        </form> 
        */}
                </div >
            </div >

        </div >
    );
};

export default Signup;