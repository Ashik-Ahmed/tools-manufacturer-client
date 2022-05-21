import React, { useEffect, useState } from 'react';

const MyOrders = () => {

    const [products, setProducts] = useState([]);

    // getting products from db 
    useEffect(() => {
        fetch('http://localhost:5000/tools')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    console.log(products);

    return (
        <div>
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => {
                                return <>
                                    <tr>
                                        <td>
                                            <div class="flex items-center space-x-3">
                                                <div class="avatar">
                                                    <div class="mask mask-squircle w-12 h-12">
                                                        <img src={product.photo} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="font-bold">{product.name}</div>
                                                    {/* <div class="text-sm opacity-50">United States</div> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {product.price}
                                            <br />
                                            {/* <span class="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                        </td>
                                        <td>{product.quantity}</td>
                                        <td>{product.quantity * product.price}</td>
                                        <td>Pending</td>
                                        <th className='flex-col gap-x-2'>
                                            <button class="btn bg-red-800 btn-xs">Cancel</button>
                                            <button class="btn bg-success btn-xs">Pay Now</button>
                                        </th>
                                    </tr>
                                </>
                            })
                        }
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default MyOrders;