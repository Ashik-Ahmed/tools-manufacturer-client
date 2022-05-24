import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri'

const ProductDeleteModal = ({ product, handleProductDelete }) => {
    return (
        <div>
            <input type="checkbox" id="my-modal-6" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h2 className='text-2xl font-extrabold'>Delete..?</h2>
                    <div className='text-7xl text-red-600 flex justify-center mx-auto'>
                        <RiDeleteBinLine />
                    </div>
                    <div className='flex gap-x-4 items-center mt-3'>
                        <img className='w-16' src={product.photo} alt="" />
                        <h3 class="font-bold text-lg">{product.name}</h3>
                    </div>
                    <div className='flex gap-x-3 justify-end'>
                        <div class="modal-action">
                            <label for="my-modal-6" class="btn">No, Cancel</label>
                        </div>
                        <div class="modal-action">
                            <label onClick={() => handleProductDelete(product._id)} for="my-modal-6" class="btn bg-red-600">Yes, Delete</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDeleteModal;