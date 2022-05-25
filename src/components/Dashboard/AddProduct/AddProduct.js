import React from 'react';
import { useQuery } from 'react-query';

const AddProduct = () => {

    const handleAddProduct = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const description = event.target.details.value;
        const minimum = event.target.minimum.value;
        const price = event.target.price.value;
        const quantity = event.target.quantity.value;
        const photo = event.target.photo.value;

        const newProduct = {
            name,
            description,
            minimum,
            price,
            quantity,
            photo,
        }
        console.log(newProduct)

        fetch('http://localhost:5000/add-product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then(res => res.json())
            .then(data => {
                alert('Successfully added');
                console.log(data)
            })
    }

    return (
        <div>
            <h2 class="card-title flex justify-center text-primary text-3xl font-bold">Add a New Product</h2>
            <div class="card w-3/4 mx-auto bg-base-100 shadow-xl  my-5">
                <div class="card-body">
                    <h2 class="card-title mx-auto text-secondary text-xl font-bold">Product Information</h2>

                    <form onSubmit={handleAddProduct} className='grid grid-cols-1 mx-auto w-3/4 gap-2'>
                        <input type="text" name='name' placeholder="Product Name" class="input input-bordered w-full" />
                        <input type="text" name='details' placeholder="Details" class="input input-bordered w-full" />
                        <input type="number" name='minimum' placeholder="Minimum Order Quantity" class="input input-bordered w-full" />
                        <input type="number" name='price' placeholder="Price" class="input input-bordered w-full" />
                        <input type="number" name='quantity' placeholder="Quantity" class="input input-bordered w-full" />
                        <input type="text" name='photo' placeholder="Product Photo Lonk" class="input input-bordered w-full" />

                        <div className='flex justify-end'>
                            <input type="submit" value="Add Now" className='btn btn-primary' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;