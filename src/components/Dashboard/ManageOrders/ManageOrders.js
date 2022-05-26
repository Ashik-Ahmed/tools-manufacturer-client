import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import AdminOrderRow from './AdminOrderRow'
import OrderDeleteModal from './OrderDeleteModal';

const ManageOrders = () => {

    const [modal, setModal] = useState(null);

    // getting orders data 
    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch('https://immense-crag-05467.herokuapp.com/manage-orders', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },

    }).then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    // delete any unpaid order 
    const handleOrderDelete = (id) => {
        const url = `https://immense-crag-05467.herokuapp.com/order/${id}`;

        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                refetch();
            })
    }

    // make order status shipped to paid orders 
    const handleShipment = (id) => {

        fetch(`https://immense-crag-05467.herokuapp.com/update-order/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ shipment: 'approved' }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
            })
    }

    return (
        <div>
            <h2>manage All Orders</h2>
            <div class=" m-6">
                <table class="table  max-w-md ">
                    <thead>
                        <tr>
                            {/* <th>Photo</th> */}
                            <th>Product Name</th>
                            <th>Customer Email</th>
                            <th>Customer Contact</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length > 0 && orders?.map(order => <AdminOrderRow key={order._id} order={order} setModal={setModal} handleShipment={handleShipment} refetch={refetch}></AdminOrderRow>)
                        }
                        {
                            modal && <OrderDeleteModal order={modal} handleOrderDelete={handleOrderDelete}></OrderDeleteModal>
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageOrders;