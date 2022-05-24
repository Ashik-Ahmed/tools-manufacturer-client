import React from 'react';
import useProducts from '../../../hooks/useProducts';
import Loading from '../../Shared/Loading';
import ProductRow from './ProductRow';

const ManageProducts = () => {

    const [products, isLoading, refetch] = useProducts();

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h2>manage All Products Here</h2>
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
                            products.length > 0 && products?.map(product => <ProductRow key={product._id} product={product} refetch={refetch}></ProductRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageProducts;