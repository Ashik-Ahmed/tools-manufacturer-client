import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSingleProduct from '../../hooks/useSingleProduct';

const UpdateProduct = () => {
    const { id } = useParams();

    const [product] = useSingleProduct(id);
    console.log(product)

    // //load the specific product by id
    // useEffect(() => {
    //     const url = `http://localhost:5000/tools/${id}`;
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => setProduct(data))
    // }, [id, product?.quantity])

    let updatedProduct;
    let quantity = product?.quantity;


    const handleDelivered = (action) => {
        updateProduct('delivered')

    }


    const handleUpdateQuantity = (e) => {
        e.preventDefault();
        const updatedQuantity = e.target.updatedQuantity.value;
        updateProduct('updateQuantity', updatedQuantity)
        e.target.reset();

    }

    // function to update product quantity 
    const updateProduct = (action, q) => {
        if (action === 'delivered') {
            if (product.quantity > 0) {
                quantity = product.quantity - 1;
                const sold = parseInt(product?.sold || 0) + 1;
                updatedProduct = { quantity, sold };
            }
        }

        if (action === 'updateQuantity') {
            if (q) {
                quantity = product.quantity + parseInt(q);
                const sold = product.sold;
                updatedProduct = { quantity, sold };
            }
            else {
                alert('Please enter a number')
            }
        }

        //send data to server
        const url = `http://localhost:5000/tools/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    // alert('Product Updated Successfully');
                    // setProduct(updatedProduct);
                }
            })

    }


    return (
        <div className='mt-16 h-screen'>

            <div>
                <div className='text-left mx-auto flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl '>


                    <img class="object-cover w-full h-96 p-2 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={product.photo} alt="" />
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{product.name}</h5>
                        <h4>Price: {product.price}</h4>
                        <p>Supplier: {product.supplier}</p>
                        <p>Stock: {product.quantity}</p>
                        <p>Sold: {product.sold}</p>
                        <p class="mb-3 text-sm text-gray-700 dark:text-gray-400">{product.description}</p>
                        <div className='flex items-center gap-x-4 justify-between'>
                            <button onClick={handleDelivered} className='bg-blue-400 px-2 rounded font-semibold'>Delivered</button>
                            <Link to='/manage' className='bg-violet-500 text-white px-2 font-semibold rounded'>Manage Inventories</Link>
                        </div>
                    </div>


                </div>

            </div>

            <div className='mt-2 mb-10'>
                <div className='bg-blue-400  p-2 inline-block rounded'>
                    <form className='flex items-center gap-x-2 ' onSubmit={handleUpdateQuantity}>
                        <input className='rounded p-1' type="number" name='updatedQuantity' placeholder='Quantity' />
                        <br />
                        <button className='bg-orange-400 p-1 rounded font-semibold'>Restock   </button>
                    </form>
                </div>


            </div>
        </div>
    );
};

export default UpdateProduct;