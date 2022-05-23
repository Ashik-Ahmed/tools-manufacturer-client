import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const { orderId } = useParams();
    const url = `http://localhost:5000/order/${orderId}`;
    const productUrl = `http://localhost:5000/order/${orderId}`;

    const { data: order, isLoading } = useQuery('tool', () => fetch(url).then(res => res.json()));
    const { data: product, loading } = useQuery('product', () => fetch(`http://localhost:5000/tools/${order.productId}`).then(res => res.json()));
    const stripePromise = loadStripe('pk_test_51L27hQBfaAM8tiFdMf9Wqlu7GMrnVRoWhcB3ExeKjfckg4c2ry7XMEVzVt7LcBa39D9k9bIdDgUY54cebVH3ngBN00iubBivaP');

    if (isLoading || loading) {
        return <Loading />
    }
    console.log(order);

    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content w-full flex-col ">
                <div class="text-center  max-w-md lg:text-left">
                    <h1 class="text-5xl font-bold">Please Pay!</h1>
                    <p class="py-6">OrderId is: {order._id}</p>
                    <p>Product: {product?.name}</p>
                    {/* <p>Quantity: {order.quantity}</p> */}
                    <p class="py-6">Total payable amount: {product?.price * order?.quantity}</p>
                </div>
                <div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                    <div class="card-body">
                        <div class="form-control mt-6">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm order={order} product={product} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;