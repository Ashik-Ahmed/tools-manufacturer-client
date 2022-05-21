import React from 'react';
import { useForm } from "react-hook-form";

const TestLogin = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();


    return (
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Card title!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default TestLogin;