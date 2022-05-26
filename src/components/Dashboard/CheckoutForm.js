import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ order, product }) => {

    const stripe = useStripe();
    const elements = useElements()
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const { _id, productId, quantity, customerEmail } = order;
    // console.log('product price: ', product.price, 'Quantity: ', quantity)

    useEffect(() => {
        if (product.price > 0) {
            fetch('http://localhost:5000/create-payment-intent', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    price: product.price,
                    quantity: quantity,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.clientSecret) {
                        setClientSecret(data.clientSecret)
                    }

                })
        }
    }, [product.price, quantity])


    // useEffect(() => {
    // fetch('http://localhost:5000/create-payment-intent', {
    //     method: 'POST',
    //     headers: {
    //         "content-type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         price: parseInt(product.price),
    //         quantity: parseInt(quantity),
    //     }),
    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         if (data?.clientSecret) {
    //             setClientSecret(data.clientSecret)
    //         }

    //     })

    //}, [quantity, product])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }


        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        setCardError(error?.message || '');
        setSuccess('');
        setProcessing(true);

        // confirm card payment 
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: customerEmail,
                    },
                },
            },
        );
        if (intentError) {
            setCardError(intentError.message);
            setProcessing(false);
        }
        else {
            setCardError('');
            setTransactionId(paymentIntent.id)
            setSuccess('Congratulations! Your payment is successful');
            // console.log(paymentIntent);


            // store payment info to DB 
            const payment = {
                order: _id,
                transactionId: paymentIntent.id,
            }
            fetch(`http://localhost:5000/order/${_id}`, {
                method: 'PATCH',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(payment),
            })
                .then(res => res.json())
                .then(data => {
                    setProcessing(false);
                    // console.log(data);
                })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className='btn btn-success mt-5 btn-sm flex' disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>

            {
                cardError && <p className='text-red-500'>{cardError}</p>
            }
            {
                success && <div className='text-green-500'>
                    <p>{success}</p>
                    <p>Transaction id: <span className='text-orange-500'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;