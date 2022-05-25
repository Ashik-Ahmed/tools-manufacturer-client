import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import AdminOrderRow from './AdminOrderRow'

const ManageOrders = () => {

    const [modal, setModal] = useState(false);

    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch('http://localhost:5000/manage-orders', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },

    }).then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    console.log(orders);

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
                            orders.length > 0 && orders?.map(order => <AdminOrderRow key={order._id} order={order} setModal={setModal} refetch={refetch}></AdminOrderRow>)
                        }
                        {/*  {
                            modal && <ProductDeleteModal product={modal} handleProductDelete={handleProductDelete}></ProductDeleteModal>
                        } */}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageOrders;