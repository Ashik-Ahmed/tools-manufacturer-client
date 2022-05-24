import React from 'react';
import { Link } from 'react-router-dom';

const ProductRow = ({ product }) => {

    const handleProductDelete = (id) => {
        console.log('deleted', id)
    }

    return (
        <tr className='hover:bg-red-200'>
            <td>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src={product.photo} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>

                </div>
            </td>
            <td>
                <div class="font-bold">{product.name}</div>
            </td>
            <td>
                <div class="font-bold">{product.price}</div>
            </td>
            <td>
                <div><p>{product.quantity}</p></div>
            </td>
            <th>
                <div className='flex gap-x-3'>
                    <Link to={`/inventory/${product._id}`} class="btn bg-green-600 btn-xs">Update</Link>
                    <button onClick={() => handleProductDelete(product._id)} class="btn bg-red-600 btn-xs">Delete</button>

                </div>
            </th>
        </tr >
    );
};

export default ProductRow;