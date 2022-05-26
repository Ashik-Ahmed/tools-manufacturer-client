import React, { useState } from 'react';
import useProducts from '../../../hooks/useProducts';
import Loading from '../../Shared/Loading';
import ProductDeleteModal from './ProductDeleteModal';
import ProductRow from './ProductRow';

const ManageProducts = () => {

    // getting all products from db 
    const [products, isLoading, refetch] = useProducts();
    const [modal, setModal] = useState(null)


    // delete any product 
    const handleProductDelete = (id) => {

        const url = `https://immense-crag-05467.herokuapp.com/tool/${id}`;

        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                refetch();
            })
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='h-fit'>
            <h2 className='text-3xl font-bold text-primary mt-4'>Manage All Products Here</h2>
            <div class="overflow-x-auto m-6">
                <table class="table w-full  ">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Available Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length > 0 && products?.map(product => <ProductRow key={product._id} product={product} setModal={setModal} refetch={refetch}></ProductRow>)
                        }
                        {
                            modal && <ProductDeleteModal product={modal} handleProductDelete={handleProductDelete}></ProductDeleteModal>
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageProducts;