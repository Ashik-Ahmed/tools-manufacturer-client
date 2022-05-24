import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import OrderRow from './OrderRow';

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);

    //get products by user email
    useEffect(() => {
        const email = user.email;
        const url = `http://localhost:5000/myOrder?email=${email}`;

        fetch(url, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        }
        )
            .then(res => res.json())
            .then(data => setOrders(data))

    }, [user])

    console.log(orders);

    // delete a product from db and ui 
    const handleCancelOrder = (id) => {

        const proceed = window.confirm("Are you sure??");
        if (proceed) {
            const url = `http://localhost:5000/order/${id}`;

            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remaining = orders.filter(tool => tool._id !== id);
                        setOrders(remaining);
                    }
                })

        }

    }


    return (
        <div className='mx-4 h-screen'>

            {
                orders.length > 0 ?
                    <div class="overflow-x-auto w-full">
                        <h2>Your Orders</h2>
                        <table class="table w-full">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <th>Payment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.map(tool => <OrderRow key={tool._id} tool={tool} handleCancelOrder={handleCancelOrder}></OrderRow>)
                                }
                            </tbody>

                        </table>
                    </div>

                    :

                    <div>
                        <h2 className='text-3xl font-bold flex justify-center mt-10'>No Orders Found</h2>
                    </div>
            }

        </div >
    );
};

export default MyOrders;