import React from 'react';
import { Link } from 'react-router-dom';
import useSingleProduct from '../../hooks/useSingleProduct';
import Loading from '../Shared/Loading';

const OrderRow = ({ tool, handleCancelOrder }) => {

    const [product] = useSingleProduct(tool.productId);

    if (!product.name) {
        return <Loading />
    }

    return (
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
            <td>{tool.quantity}</td>
            <td>{tool.quantity * product.price}</td>
            <td>{tool.status ? <p className='text-green-500 font-bold'>Shipped</p> : <p className='text-red-500 font-bold'>Pending</p>}</td>
            <th className='flex-col gap-x-2'>
                {!tool.paid && <button onClick={() => handleCancelOrder(tool._id)} class="btn bg-red-800 btn-xs">Cancel</button>}

            </th>
            <th className='flex-col gap-x-2'>
                {!tool.paid && <div><p className='text-red-600'>Pending </p><Link to={`/dashboard/payment/${tool._id}`} class="btn bg-success btn-xs">Pay Now</Link></div>}
                {tool.paid && <div><span class="bg-blue-500 text-white px-1">Paid</span> <br /><small className='text-xs'>TxnID: <span className='text-red-400'>{tool.transactionId}</span> </small></div>}
            </th>
        </tr>
    );
};

export default OrderRow;