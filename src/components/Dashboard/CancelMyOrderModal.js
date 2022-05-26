import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri'

const CancelMyOrderModal = ({ order, handleCancelOrder }) => {
    return (
        <div>
            <input type="checkbox" id="order-cancel-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h2 className='text-2xl font-extrabold'>Are You Sure..?</h2>
                    <div className='text-7xl text-red-600 flex justify-center mx-auto'>
                        <RiDeleteBinLine />
                    </div>
                    <div className='flex gap-x-3 justify-end'>
                        <div class="modal-action">
                            <label for="order-cancel-modal" class="btn">No, Cancel</label>
                        </div>
                        <div class="modal-action">
                            <label onClick={() => handleCancelOrder(order._id)} for="order-cancel-modal" class="btn bg-red-600">Yes, Delete</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelMyOrderModal;