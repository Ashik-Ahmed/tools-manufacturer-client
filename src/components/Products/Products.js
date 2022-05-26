import React from 'react';
import useProducts from '../../hooks/useProducts';
import Product from '../Product/Product';
import Loading from '../Shared/Loading';

const Products = () => {
    const [products, isLoading] = useProducts();

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h2 className='text-3xl text-primary font-bold mb-8'>Please Choose your desired product</h2>
            <div className='md:flex my-5 gap-x-4 mx-auto justify-center'>
                {
                    products.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default Products;