import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useSingleProduct from '../../hooks/useSingleProduct';

const ConfirmOrder = () => {

    const [user] = useAuthState(auth);
    const { id } = useParams();
    const [product, setProduct] = useSingleProduct(id);
    const [inputQuantity, setInputQuantity] = useState(1);

    // if (!product.name) {
    //     return <Loading />
    // }

    // order cancel functionality 
    const handleCancelOrder = () => {
        setProduct([]);
    }

    // update quantity value by uesr input 
    const handleQuantity = (e) => {
        setInputQuantity(e.target.value);

    }

    const navigate = useNavigate();
    //order confirmation functinality
    const handleConfirmOrder = (event) => {
        event.preventDefault();

        const name = event.target.name.value || user?.displayName;
        const email = event.target.email.value || user?.email;
        const contactNumber = event.target.contact.value;
        const address = event.target.address.value;

        //order details to store in DB
        const order = {
            productId: product._id,
            quantity: inputQuantity || 1,
            customerName: name,
            customerEmail: email,
            customerNumber: contactNumber,
            customerAddress: address
        }

        //set updated product to update the quantity in DB
        const updatedProduct = {
            quantity: parseInt(product.quantity) - parseInt(inputQuantity)
        }

        if (!inputQuantity) {
            toast.warn('Please enter Quantity');
        }
        else if (parseInt(inputQuantity) < parseInt(product.minimum)) {
            toast.warn('Order quantity should more that minimum order quantity')
        }
        else if (parseInt(inputQuantity) > parseInt(product.quantity)) {
            toast.warn('Order quantity is more that available quantity')
        }
        else {

            fetch('http://localhost:5000/confirm-order', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(order)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    toast.success('Order Placed Successfully');
                    event.target.reset();

                    const url = (`http://localhost:5000/tool/${product._id}`)
                    console.log(url)
                    fetch(`http://localhost:5000/tool/${product._id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(updatedProduct)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log('product updated : ', data);
                            navigate('/dashboard/my-orders');
                        })

                })

            console.log('Product Id:', order.productId, 'name: ', name, 'email: ', email, 'number: ', contactNumber, 'address', address, 'Quantity: ', inputQuantity);
        }
    }


    return (
        <div className='h-screen'>
            <h2>Please confirm your order</h2>

            {
                !product.name ?

                    <h3 className='text-3xl font-bold flex justify-center items-center'>No Product Added</h3>

                    :

                    <div>
                        <div class="overflow-x-auto w-full">
                            <table class="table w-full">
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>


                                <tbody>
                                    <tr>
                                        <th>
                                            <div class="avatar">
                                                <div class="mask mask-squircle w-12 h-12">
                                                    <img src={product.photo} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </th>
                                        <td>

                                            <div>
                                                <div class="font-bold">{product.name}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <input onBlur={handleQuantity} type="number" name='quantity' placeholder='1' className='border border-black w-1/4' />

                                        </td>
                                        <td>{product.price}</td>
                                        <th>
                                            <button onClick={handleCancelOrder} class="btn bg-red-500 btn-xs">Cancel</button>
                                        </th>
                                    </tr>
                                </tbody>


                            </table>
                        </div>


                        <div class="card bg-base-100 mx-auto px-8 py-5 w-3/4 shadow-xl">
                            <h2>Shipping Information</h2>
                            <form onSubmit={handleConfirmOrder}>
                                <div className='md:flex gap-x-4 justify-center'>
                                    <div class="form-control w-full max-w-xs">
                                        <label class="label">
                                            <span class="label-text">Name</span>
                                        </label>
                                        <input type="text" name='name' placeholder={user.displayName} class="input input-bordered w-full max-w-xs" />
                                    </div>
                                    <div class="form-control w-full max-w-xs">
                                        <label class="label">
                                            <span class="label-text">Email</span>
                                        </label>
                                        <input type="email" name='email' placeholder={user.email} class="input input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className='md:flex gap-x-4 justify-center'>
                                    <div class="form-control w-full max-w-xs">
                                        <label class="label">
                                            <span class="label-text">Contact Number</span>
                                        </label>
                                        <input type="text" name='contact' placeholder="Contact Number" class="input input-bordered w-full max-w-xs" required />
                                    </div>
                                    <div class="form-control w-full max-w-xs">
                                        <label class="label">
                                            <span class="label-text">Address</span>
                                        </label>
                                        <input type="text" name='address' placeholder="Address" class="input input-bordered w-full max-w-xs" required />
                                    </div>
                                </div>
                                <input type='submit' className='btn btn-primary mt-5' value='Confirm Order'></input>
                                {/* <input type='submit' style={(parseInt(quantity) >= parseInt(product.minimum) || parseInt(quantity) <= parseInt(product.quantity)) ? { disabled: 'false' } : { disabled: 'true' }} className='btn btn-primary mt-5' value='Confirm Order' disabled='true'></input> */}
                            </form>

                        </div>



                    </div>
            }

        </div >
    );
};

export default ConfirmOrder;