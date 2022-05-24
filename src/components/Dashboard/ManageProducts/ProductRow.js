import React from 'react';
import { Link } from 'react-router-dom';

const ProductRow = ({ product, setModal }) => {


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

                <Link to={`/inventory/${product._id}`} class="btn bg-green-600 btn-sm">Update</Link>

                <label onClick={() => setModal(product)} for="my-modal-6" class="btn bg-red-600 btn-sm ml-3">Delete</label>
            </th>
        </tr >
    );
};

export default ProductRow;