import React from 'react';
import useSingleProduct from '../../../hooks/useSingleProduct';
import Loading from '../../Shared/Loading';

const OrderRow = ({ order, setModal, handleShipment }) => {

    // getting single ordered product 
    const [product] = useSingleProduct(order.productId);

    if (!product.photo) {
        return <Loading />
    }

    return (
        <tr className='hover:bg-red-200 max-w-md text-sm'>
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

                {order.paid
                    ?
                    <div>
                        {
                            order.status === 'approved' ?
                                <p>Shipped</p>
                                :
                                <button onClick={() => handleShipment(order._id)} class="btn bg-green-600 btn-xs">Make Shipment</button>
                        }
                    </div>
                    :
                    <label onClick={() => setModal(order)} for="order-delete-modal" class="btn bg-red-600 btn-xs ml-3">Delete</label>
                }

                { }
            </th>
        </tr >
    );
};

export default OrderRow;