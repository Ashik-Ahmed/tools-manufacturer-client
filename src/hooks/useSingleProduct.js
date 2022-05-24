import { useEffect, useState } from "react";

const useSingleProduct = (id) => {
    const [product, setProduct] = useState({})

    //load the specific product by id
    useEffect(() => {
        const url = `http://localhost:5000/tools/${id}`;
        fetch(url, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id])
    return [product, setProduct];
}

export default useSingleProduct;