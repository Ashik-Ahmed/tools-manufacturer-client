import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import useSingleProduct from '../../hooks/useSingleProduct';
import Loading from '../Shared/Loading';

const UpdateProduct = () => {
    const { id } = useParams();

    const { data: product, isLoading, refetch } = useQuery('product', () => fetch(`http://localhost:5000/tools/${id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))


    if (isLoading || !product) {
        return <Loading />
    }

    let quantity = product?.quantity;


    const handleUpdateQuantity = (e) => {
        e.preventDefault();
        const updatedQuantity = e.target.updatedQuantity.value;
        updateProduct(updatedQuantity)
        e.target.reset();

    }

    // function to update product quantity 
    const updateProduct = (inputQuantity) => {
        if (inputQuantity) {
            quantity = parseInt(product.quantity) + parseInt(inputQuantity);

            //send data to server
            const url = `http://localhost:5000/tool/${id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ quantity })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.modifiedCount > 0) {
                        alert('Product Updated Successfully');
                        refetch();
                    }
                })
        }
        else {
            alert('Please enter a number')
        }
    }


    return (
        <div className='mt-16 h-screen'>

            <div className='flex items-center gap-x-4 justify-end w-3/4 mx-auto'>
                <Link to='/dashboard/manage-products' className='bg-primary text-white px-2 font-semibold rounded'>Manage All Products</Link>
            </div>
            <div class="hero md:w-3/4 mx-auto shadow-2xl">
                <div class="hero-content flex-col lg:flex-row">
                    <img src={product.photo} alt='Product' class="max-w-sm rounded-lg" />
                    <div className='ml-10'>
                        <h1 class="text-5xl font-bold md:my-4">{product.name}</h1>
                        <p className='font-bold text-left'>Details: </p>
                        <p className='font-bold text-left'>Available Qty. : {product.quantity}</p>
                        <p className='font-bold text-left'>Sold: {product.sold}</p>
                        <div className='bg-gray-400 mt-8 p-2 inline-block rounded'>
                            <form className='flex items-center gap-x-2 ' onSubmit={handleUpdateQuantity}>
                                <input className='rounded p-1' type="number" name='updatedQuantity' placeholder='Quantity' />
                                <br />
                                <button className='bg-secondary text-white py-1 px-2 rounded font-semibold'>Restock</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            {/* <div>
                <div className='flex items-center gap-x-4 justify-between'>
                    <Link to='/dashboard/manage-products' className='bg-violet-500 text-white px-2 font-semibold rounded'>Manage Inventories</Link>
                </div>
                <div className='text-left mx-auto flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl '>


                    <img class="object-cover w-full h-96 p-2 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={product.photo} alt="" />
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{product.name}</h5>
                        <h4>Price: {product.price}</h4>
                        <p>Supplier: {product.supplier}</p>
                        <p>Stock: {product.quantity}</p>
                        <p>Sold: {product.sold}</p>
                        <p class="mb-3 text-sm text-gray-700 dark:text-gray-400">{product.description}</p>

                    </div>


                </div>

            </div> */}

            {/* <div className='mt-2 mb-10'>
                <div className='bg-blue-400  p-2 inline-block rounded'>
                    <form className='flex items-center gap-x-2 ' onSubmit={handleUpdateQuantity}>
                        <input className='rounded p-1' type="number" name='updatedQuantity' placeholder='Quantity' />
                        <br />
                        <button className='bg-orange-400 p-1 rounded font-semibold'>Restock   </button>
                    </form>
                </div>


            </div> */}
        </div>
    );
};

export default UpdateProduct;