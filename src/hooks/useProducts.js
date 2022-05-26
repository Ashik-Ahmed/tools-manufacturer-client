import { useQuery } from "react-query";

const useProducts = () => {

    // getting products from db 
    const { data: products, isLoading, refetch } = useQuery('products', () => fetch('https://immense-crag-05467.herokuapp.com/tools', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    return [products, isLoading, refetch]
}

export default useProducts;