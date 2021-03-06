import React from 'react';
import { Link } from 'react-router-dom';
import useSingleProduct from '../../hooks/useSingleProduct';
import Loading from '../Shared/Loading';

const OrderRow = ({ tool, setModal, handleCancelOrder }) => {

    // getting single ordered product 
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
                        <div>{product.name}</div>
                    </div>
                </div>
            </td>
            <td>
                {product.price}
                <br />
            </td>
            <td>{tool.quantity}</td>
            <td>{tool.quantity * product.price}</td>
            <td>{tool.status ? <p className='text-green-500'>Shipped</p> : <p className='text-red-500'>Pending</p>}</td>
            <th className='flex-col gap-x-2'>
                {!tool.paid && <label onClick={() => setModal(tool)} for="order-cancel-modal" class="btn bg-red-800 btn-xs">Cancel</label>}

            </th>
            <th className='flex-col gap-x-2'>
                {!tool.paid && <div><p className='text-red-600'>Pending </p><Link to={`/dashboard/payment/${tool._id}`} class="btn bg-success btn-xs">Pay Now</Link></div>}
                {tool.paid && <div><span class="bg-blue-500 text-white px-1">Paid</span> <br /><small className='text-xs'>TxnID: <span className='text-red-400'>{tool.transactionId}</span> </small></div>}
            </th>
        </tr>
    );
};

export default OrderRow;