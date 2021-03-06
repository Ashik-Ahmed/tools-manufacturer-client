import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import CancelMyOrderModal from './CancelMyOrderModal';
import OrderRow from './OrderRow';

const MyOrders = () => {

    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);
    const [modal, setModal] = useState(null);

    //get products by user email
    useEffect(() => {
        const email = user.email;
        const url = `https://immense-crag-05467.herokuapp.com/myOrder?email=${email}`;

        fetch(url, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        }
        )
            .then(res => res.json())
            .then(data => setOrders(data))

    }, [user])

    // delete a product from db and ui 
    const handleCancelOrder = (id) => {

        const url = `https://immense-crag-05467.herokuapp.com/order/${id}`;

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
                                    orders?.map(tool => <OrderRow key={tool._id} tool={tool} setModal={setModal} handleCancelOrder={handleCancelOrder} ></OrderRow>)
                                }
                                {
                                    modal && <CancelMyOrderModal order={modal} handleCancelOrder={handleCancelOrder}></CancelMyOrderModal>
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