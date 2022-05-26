import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import AdminOrderRow from './AdminOrderRow'
import OrderDeleteModal from './OrderDeleteModal';

const ManageOrders = () => {

    const [modal, setModal] = useState(null);

    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch('http://localhost:5000/manage-orders', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },

    }).then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    const handleOrderDelete = (id) => {
        const url = `http://localhost:5000/order/${id}`;

        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                refetch();
            })
    }

    const handleShipment = (id) => {

        fetch(`http://localhost:5000/update-order/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ shipment: 'approved' }),
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <div>
            <h2>manage All Orders</h2>
            <div class="overflow-x-auto m-6">
                <table class="table w-full ">
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