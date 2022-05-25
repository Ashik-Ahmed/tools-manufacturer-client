import React from 'react';
import { Link } from 'react-router-dom';
import useSingleProduct from '../../../hooks/useSingleProduct';
import Loading from '../../Shared/Loading';

const OrderRow = ({ order, setModal }) => {

    const [product] = useSingleProduct(order.productId);

    console.log(product);
    if (!product.photo) {
        return <Loading />
    }

    return (
        <tr className='hover:bg-red-200 text-sm'>
            {/* <td>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src={product.photo} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td> */}
            <td>
                <div>{product.name}</div>
            </td>
            <td>
                <div>{order.customerEmail}</div>
            </td>
            <td>
                <div>{order.customerNumber}</div>
            </td>
            <td>
                <div>{product.price}</div>
            </td>
            <td>
                <div><p>{order.quantity}</p></div>
            </td>
            <td>
                <div><p>{order.quantity * product.price}</p></div>
            </td>
            <td>
                <div><p>{order.paid ? <p className='text-green-600 font-bold'>Paid</p> : <p className='text-red-600 font-bold'>Pending</p>}</p></div>
            </td>
            <th>

                {order.paid && <Link to={`/inventory/${product._id}`} class="btn bg-green-600 btn-sm">Make Shipment</Link>}

                {!order.paid && <label onClick={() => setModal(product)} for="my-modal-6" class="btn bg-red-600 btn-sm ml-3">Delete</label>}
            </th>
        </tr >
    );
};

export default OrderRow;