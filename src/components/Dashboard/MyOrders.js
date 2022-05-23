import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);

    //get products by user email
    useEffect(() => {
        const email = user.email;
        const url = `http://localhost:5000/myOrder?email=${email}`;

        fetch(url,
            //     {
            //     headers: {
            //         authorization: `Bearer ${localStorage.getItem('accessToken')}`
            //     }
            // }
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
            <h2>Your Orders</h2>

            <div class="overflow-x-auto w-full">
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
                            orders?.map(tool => {
                                return <>
                                    <tr>
                                        <td>
                                            <div class="flex items-center space-x-3">
                                                <div class="avatar">
                                                    <div class="mask mask-squircle w-12 h-12">
                                                        <img src={tool.photo} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="font-bold">{tool.name}</div>
                                                    {/* <div class="text-sm opacity-50">United States</div> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {tool.price}
                                            <br />
                                            {/* <span class="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                        </td>
                                        <td>{tool.quantity}</td>
                                        <td>{tool.quantity * tool.price}</td>
                                        <td>Pending</td>
                                        <th className='flex-col gap-x-2'>
                                            {!tool.paid && <button onClick={() => handleCancelOrder(tool._id)} class="btn bg-red-800 btn-xs">Cancel</button>}

                                        </th>
                                        <th className='flex-col gap-x-2'>
                                            {!tool.paid && <Link to={`/dashboard/payment/${tool._id}`} class="btn bg-success btn-xs">Pay Now</Link>}
                                            {tool.paid && <div><span class="bg-blue-500 text-white px-1">Paid</span> <br /><small className='text-xs'>TxnID: <span className='text-red-400'>{tool.transactionId}</span> </small></div>}
                                        </th>
                                    </tr>
                                </>
                            })
                        }
                    </tbody>

                </table>
            </div>

        </div >
    );
};

export default MyOrders;